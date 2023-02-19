using DAL.Entities;
using DAL.Repositories.Classes;

namespace DAL.Repositories.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category, Guid>
    {
        IQueryable<Category> Categories { get; }
        Task<Category> GetByNameAsync(string name);
        Task<bool> IsExistAsync(string name);
    }
}
