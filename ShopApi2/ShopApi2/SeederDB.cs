using DAL.Entities;
using DAL.Entities.Identity;
using DAL.Entities.Image;
using DAL.Repositories.Interfaces;
using Infrastructure.Constants;
using Microsoft.AspNetCore.Identity;

namespace ShopApi2
{
    public static class SeederDb
    {
        public static async void SeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                var categoryRepository = scope.ServiceProvider.GetRequiredService<ICategoryRepository>();
                var productRepository = scope.ServiceProvider.GetRequiredService<IProductRepository>();

                if (!roleManager.Roles.Any())
                {
                    await roleManager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.Admin
                    });

                    await roleManager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.User
                    });
                }

                if (!userManager.Users.Any())
                {
                    const string adminEmail = "admin@gmail.com";
                    var admin = new UserEntity
                    {
                        Email = adminEmail,
                        UserName = adminEmail,
                        FirstName = "Admin",
                        LastName = "Admin",
                    };
                    await userManager.CreateAsync(admin, "123456");
                    await userManager.AddToRoleAsync(admin, Roles.Admin);

                    const string userEmail = "user@gmail.com";
                    var user = new UserEntity
                    {
                        Email = userEmail,
                        UserName = userEmail,
                        FirstName = "User",
                        LastName = "User",
                    };
                    await userManager.CreateAsync(user, "123456");
                    await userManager.AddToRoleAsync(user, Roles.User);
                }

                if (!categoryRepository.Categories.Any())
                {
                    var category = new Category
                    {
                        Name = "Футболки",
                        NormalizedName = "Футболки".ToUpper()
                    };
                    await categoryRepository.CreateAsync(category);

                    category = new Category
                    {
                        Name = "Штани",
                        NormalizedName = "Штани".ToUpper()
                    };
                    await categoryRepository.CreateAsync(category);

                    category = new Category
                    {
                        Name = "Unknown",
                        NormalizedName = "Unknown".ToUpper()
                    };
                    await categoryRepository.CreateAsync(category);
                }

                if (!productRepository.Products.Any())
                {
                    var productImagePath = Path.Combine(ImagesConstants.ImagesFolder, ImagesConstants.ProductImageFolder);
                    var product = new Product
                    {
                        Name = "Джинси",
                        Price = 50,
                        Size = "L",
                        Article = "87128",
                        Image = new ProductImageEntity
                        {
                            FileName = "test.jpg",
                            Path = productImagePath,
                            FullName = Path.Combine(productImagePath, "test.jpg")
                        }
                    };
                    await productRepository.CreateAsync(product);
                    await productRepository.AddToCategoryAsync(product, "Штани");

                    product = new Product
                    {
                        Name = "Футболка Nike",
                        Price = 20,
                        Size = "M",
                        Article = "12892",
                        Image = new ProductImageEntity
                        {
                            FileName = "test.jpg",
                            Path = productImagePath,
                            FullName = Path.Combine(productImagePath, "test.jpg")
                        }
                    };
                    await productRepository.CreateAsync(product);
                    await productRepository.AddToCategoryAsync(product, "Футболки");
                }
            }
        }
    }
}