﻿using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;

namespace DAL.Repositories.Classes
{
    public class ProductRepository : GenericRepository<Product, Guid>,
        IProductRepository
    {
        private readonly AppEFContext _dbContext;

        public ProductRepository(AppEFContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<Product> Products => GetAll()
            .Include(p => p.CategoryProduct)
            .ThenInclude(cp => cp.Category)
            .Include(p => p.Image);

        public async Task<bool> AddToCategoryAsync(Product product, string categoryName)
        {
            var category = await _dbContext.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.NormalizedName == categoryName.ToUpper());
            if (category == null)
            {
                return false;
            }
            var categoryProduct = new CategoryProduct
            {
                CategoryId = category.Id,
                ProductId = product.Id
            };
            await _dbContext.CategoryProduct.AddAsync(categoryProduct);
            var result = await _dbContext.SaveChangesAsync();
            return result != 0;
        }

        public async Task<bool> AddToCategoryAsync(Product product, IEnumerable<string> categories)
        {
            var enumerable = categories.ToList();
            if (!enumerable.Any()) return false;
            foreach (var category in enumerable)
            {
                var result = await AddToCategoryAsync(product: product, categoryName: category);
                if (!result)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
