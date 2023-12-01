#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#COPY ["BeautyQueenApi/BeautyQueenApi.csproj", "BeautyQueenApi/"]
#RUN dotnet restore "BeautyQueenApi/BeautyQueenApi.csproj"
#COPY . .
#WORKDIR "/src/BeautyQueenApi"
#RUN dotnet build "BeautyQueenApi.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "BeautyQueenApi.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "BeautyQueenApi.dll"]


FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:6.0 as final-env
WORKDIR /app
COPY --from=build-env /app/out .
RUN dir
ENTRYPOINT ["dotnet", "BeautyQueenApi.dll"]

#FROM microsoft/dotnet:2.1-sdk AS build
#WORKDIR /app
#COPY *.csproj ./
#RUN dotnet restore BeautyQueenApi.csproj
#COPY . ./
#RUN dotnet publish BeautyQueenApi.csproj -c Release -o out
#FROM microsoft/dotnet:2.1-aspnetcore-runtime AS runtime
#WORKDIR /app
#COPY — from=build /app/out .
#ENTRYPOINT ["dotnet", "BeautyQueenApi.dll"]