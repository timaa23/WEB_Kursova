using AutoMapper;
using DAL.Entities;
using Infrastructure.Models.Category;

namespace Infrastructure.Settings.Mapper
{
    public class AutoMapperCategoryProfile : Profile
    {
        public AutoMapperCategoryProfile()
        {
            CreateMap<Category, CategoryVm>()
                .ForMember(dest => dest.Id,
                    opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name,
                    opt => opt.MapFrom(src => src.Name));

            CreateMap<CategoryProduct, CategoryVm>()
                .ForMember(
                    dest => dest.Id,
                opt => opt.MapFrom(src => src.CategoryId))
                .ForMember(
                    dest => dest.Name,
                opt => opt.MapFrom(src => src.Category.Name));

            CreateMap<CategoryCreateVm, Category>()
                .ForMember(
                    dest => dest.NormalizedName,
                    opt => opt.MapFrom((src => src.Name.ToUpper())))
                .ForMember(
                    dest => dest.DateCreated,
                    opt => opt.MapFrom(src => DateTime.Now.ToUniversalTime()));

            CreateMap<CategoryUpdateVm, Category>()
                .ForMember(
                    dest => dest.NormalizedName,
                    opt => opt.MapFrom((src => src.Name.ToUpper())));
        }
    }
}
