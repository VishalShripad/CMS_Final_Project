using AutoMapper;
using CMS.API.Dtos;
using CMS.API.Entities;

namespace CMS.API.Helper
{
    public class AutoMappingProfiles : Profile
    {
        public AutoMappingProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<Channel, ChannelDto>();
            CreateMap<Cart, CartToReturnDto>();
            CreateMap<CartDetail, CartDetailsDto>();
            CreateMap<Plan, PlanDto>().ReverseMap();
            CreateMap<PlanDetial, PlanDetailsDto>();
        }
    }
}
