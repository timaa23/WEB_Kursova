using DAL.Entities.Image;
using DAL.Repositories.Classes;

namespace DAL.Repositories.Interfaces;

public interface IFileRepository : IGenericRepository<BaseFileEntity, Guid>
{

}