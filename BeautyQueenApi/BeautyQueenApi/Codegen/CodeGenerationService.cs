using NJsonSchema.CodeGeneration.TypeScript;
using NSwag;
using NSwag.AspNetCore;
using NSwag.CodeGeneration;
using NSwag.CodeGeneration.TypeScript;
using NSwag.Generation.AspNetCore;

namespace BeautyQueenApi.CodeGen;

public class CodeGenerationService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IEnumerable<OpenApiDocumentRegistration> _documents;

    public CodeGenerationService(
        IServiceProvider serviceProvider,
        IEnumerable<OpenApiDocumentRegistration> documents)
    {
        _serviceProvider = serviceProvider;
        _documents = documents;
    }

    private Task<OpenApiDocument> GenerateOpenApiDocumentAsync(string documentName)
    {
        if (string.IsNullOrWhiteSpace(documentName))
            throw new ArgumentNullException(nameof (documentName));

        var documentRegistration = _documents.SingleOrDefault(r => r.DocumentName == documentName);
        if (documentRegistration?.Settings == null)
            throw new InvalidOperationException("No registered OpenAPI/Swagger document found for the document name '" + documentName + "'. Add with the AddSwagger()/AddOpenApi() methods in ConfigureServices().");

        return new AspNetCoreOpenApiDocumentGenerator(documentRegistration?.Settings)
            .GenerateAsync(_serviceProvider.CreateScope());
    }

    private async Task GenerateDtoTypesAsync()
    {
        Console.WriteLine("Generating models...");

        var document = await GenerateOpenApiDocumentAsync("v1");
        var generator = new TypeScriptClientGenerator(document, new TypeScriptClientGeneratorSettings
        {
            Template = TypeScriptTemplate.Axios,
            GenerateDtoTypes = true,
            GenerateClientClasses = false,
            GenerateClientInterfaces = false,
            GenerateResponseClasses = true,
            TypeScriptGeneratorSettings =
            {
                EnumStyle = TypeScriptEnumStyle.Enum,
                TypeStyle = TypeScriptTypeStyle.Interface,
                UseLeafType = false,
                NullValue = TypeScriptNullValue.Undefined,
                DateTimeType = TypeScriptDateTimeType.String,
                GenerateDefaultValues = true,
                MarkOptionalProperties = false,
                GenerateCloneMethod = false,
            },
        });

        var content = generator
            .GenerateFile(ClientGeneratorOutputType.Contracts)
            .Replace("\r\n", "\n")
            .Replace("\r", "\n")
            .Replace("\n", Environment.NewLine);

        // foreach (var generateDtoPath in _settings.GenerateDtoPaths)
        // {
        // }
        if(!Directory.Exists("generated")) {
            Directory.CreateDirectory("generated");
        }
        const string path = "generated/models.ts";

        if (File.Exists(path) &&
            await AreFileContentsEqualAsync(content, path))
        {
            return;
        }

        await File.WriteAllTextAsync(
            path,
            content
        );
    }

    private async Task GenerateTypeScriptClient() {
        const string generatePath = "/home/turbulent/Desktop/projects/beauty-queen/frontend/generated";
        
        if(!Directory.Exists(generatePath)) {
            Directory.CreateDirectory(generatePath);
        }

        var document = await GenerateOpenApiDocumentAsync("v1");

        await GenerateClient(
            document: document,
            generatePath: generatePath + "/client.ts",
            generateCode: (OpenApiDocument document) =>
            {
                var settings = new TypeScriptClientGeneratorSettings {
                    Template = TypeScriptTemplate.Axios,
                    ImportRequiredTypes = true,
                    TypeScriptGeneratorSettings = {
                        TypeStyle = TypeScriptTypeStyle.Interface,
                        TypeScriptVersion = 3.5M,
                        DateTimeType = TypeScriptDateTimeType.String,
                        NullValue = TypeScriptNullValue.Undefined,
                        GenerateConstructorInterface = false,
                        GenerateCloneMethod = false
                    },
                };

                var generator = new TypeScriptClientGenerator(document, settings);
                var code = generator.GenerateFile();

                return code;
            }
        );
    }

    private async Task GenerateClient(OpenApiDocument document, string generatePath, Func<OpenApiDocument, string> generateCode)
    {
        Console.WriteLine($"Generating client...");

        var code = generateCode(document);

        await System.IO.File.WriteAllTextAsync(generatePath, code);
    }

    private async Task<bool> AreFileContentsEqualAsync(string content, string filePath)
    {
        return await File.ReadAllTextAsync(filePath) == content;
    }

    public async Task InitializeAsync()
    {
        if(true)
            await GenerateDtoTypesAsync();
        if(true)
            await GenerateTypeScriptClient();
    }
}
