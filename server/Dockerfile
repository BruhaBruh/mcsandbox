FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Production
ENV LOGGING__CONSOLE__FORMATTERNAME=Systemd

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Sandbox.csproj", "."]
RUN dotnet restore "./Sandbox.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Sandbox.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Sandbox.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Sandbox.dll", "--urls", "http://*:5000"]