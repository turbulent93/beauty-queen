using BeautyQueenApi.Constants;
using BeautyQueenApi.Converters;
using BeautyQueenApi.Data;
using BeautyQueenApi.Repositories.AppointmentRepository;
using BeautyQueenApi.Repositories.AppointmentService;
using BeautyQueenApi.Repositories.AuthRepository;
using BeautyQueenApi.Repositories.EmployeeRepository;
using BeautyQueenApi.Repositories.MetaRepository;
using BeautyQueenApi.Repositories.PhotoRepository;
using BeautyQueenApi.Repositories.PromoRepository;
using BeautyQueenApi.Repositories.PromotionsRepository;
using BeautyQueenApi.Repositories.RoleRepository;
using BeautyQueenApi.Repositories.ScheduleRepository;
using BeautyQueenApi.Repositories.ServiceRepository;
using BeautyQueenApi.Repositories.SettingsRepository;
using BeautyQueenApi.Repositories.SpecializationRepository;
using BeautyQueenApi.Repositories.UnitRepository;
using BeautyQueenApi.Repositories.UserRepository;
using BeautyQueenApi.Services.StatisticService;
using BeautyQueenApi.Services.TokenService;
using BeautyQueenApi.Services.UploadService;
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

//var host = Environment.GetEnvironmentVariable("POSTGRES_HOST");
var port = Environment.GetEnvironmentVariable("POSTGRES_PORT");
var database = Environment.GetEnvironmentVariable("POSTGRES_DB");
var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
var username = Environment.GetEnvironmentVariable("POSTGRES_USER");

var connectionString = $"Server=host.docker.internal;Port={port};Database={database};Password={password};Username={username};";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

var config = TypeAdapterConfig.GlobalSettings;

config.Scan(Assembly.GetExecutingAssembly());

builder.Services.AddSingleton(config);
builder.Services.AddScoped<IMapper, ServiceMapper>();

builder.Services.AddControllers().AddJsonOptions(x =>
{
    x.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    x.JsonSerializerOptions.Converters.Add(new TimeOnlyJsonConverter());
});

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

//builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//    .AddCookie();

builder.Services.AddTransient<IServiceRepository, ServiceRepository>();
builder.Services.AddTransient<ISpecializationRepository, SpecializationRepository>();
builder.Services.AddTransient<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddTransient<IScheduleRepository, ScheduleRepository>();
builder.Services.AddTransient<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IRoleRepository, RoleRepository>();
builder.Services.AddTransient<IAuthRepository, AuthRepository>();
builder.Services.AddTransient<IUnitRepository, UnitRepository>();
builder.Services.AddTransient<IPromoRepository, PromoRepository>();
builder.Services.AddTransient<IPhotoRepository, PhotoRepository>();

builder.Services.AddTransient<ISettingsRepository, SettingsRepository>();
builder.Services.AddTransient<IMetaRepository, MetaRepository>();

builder.Services.AddTransient<IUploadService, UploadService>();
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<IStatisticService, StatisticService>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("FrontendPolicy");

app.UseStaticFiles();

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
