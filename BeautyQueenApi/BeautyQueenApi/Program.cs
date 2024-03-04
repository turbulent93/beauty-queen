using BeautyQueenApi.CodeGen;
using BeautyQueenApi.Constants;
using BeautyQueenApi.Data;
using BeautyQueenApi.Services.StatisticService;
using BeautyQueenApi.Services.TokenService;
using BeautyQueenApi.Services.UserService;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(p => p.AddPolicy("FrontendPolicy", build =>
{
    build.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

//var host = Environment.GetEnvironmentVariable("POSTGRES_HOST");


// var port = Environment.GetEnvironmentVariable("POSTGRES_PORT");
// var database = Environment.GetEnvironmentVariable("POSTGRES_DB");
// var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
// var username = Environment.GetEnvironmentVariable("POSTGRES_USER");

var port = 5432;
var database = "beautyQueen";
var password = "postgres";
var username = "postgres";

var connectionString = $"Host=localhost;Port={port};Database={database};Password={password};Username={username}";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

var config = TypeAdapterConfig.GlobalSettings;

config.Scan(Assembly.GetExecutingAssembly());

builder.Services.AddSingleton(config);
builder.Services.AddScoped<IMapper, ServiceMapper>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = AuthOptions.ValidateAudience,
            ValidateIssuer = AuthOptions.ValidateIssuer,
            ValidateIssuerSigningKey = AuthOptions.ValidateIssuerSigningKey,
            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<IStatisticService, StatisticService>();
builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddSwaggerDocument();

builder.Services.AddTransient<CodeGenerationService>();
builder.Services.AddTransient<DbInitializer>();

var app = builder.Build();

await app.InitializeDatabaseAsync();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseOpenApi();
// app.UseSwaggerUi3();

app.UseCors("FrontendPolicy");

app.UseStaticFiles();

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

await app.Services.GetRequiredService<CodeGenerationService>().InitializeAsync();

app.Run();
