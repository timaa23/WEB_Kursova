using ShopApi2;
using DAL;
using DAL.Entities.Identity;
using DAL.Repositories.Classes;
using DAL.Repositories.Interfaces;
using Infrastructure.Constants;
using Infrastructure.Services.Classes;
using Infrastructure.Services.Interfaces;
using Infrastructure.Settings;
using Infrastructure.Settings.Mapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppEFContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddIdentity<UserEntity, RoleEntity>(opt =>
{
    opt.Password.RequireDigit = false;
    opt.Password.RequiredLength = 5;
    opt.Password.RequireNonAlphanumeric = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<AppEFContext>().AddDefaultTokenProviders();

var googleAuthSettings = builder.Configuration
    .GetSection("GoogleAuthSettings")
    .Get<GoogleAuthSettings>();

builder.Services.AddSingleton(googleAuthSettings);

builder.Services.AddControllers();

// Add repositories
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Add services
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IFileService, FileService>();

// Add automapper
builder.Services.AddAutoMapper(typeof(AutoMapperProductProfile));
builder.Services.AddAutoMapper(typeof(AutoMapperCategoryProfile));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyHeader())
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

var dir = Path.Combine(Directory.GetCurrentDirectory(), ImagesConstants.ImagesFolder);
if (!Directory.Exists(dir))
{
    Directory.CreateDirectory(dir);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(dir),
    RequestPath = "/" + ImagesConstants.ImagesFolder
});

app.MapControllers();

app.SeedData();

app.Run();