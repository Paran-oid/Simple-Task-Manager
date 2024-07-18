using AutoMapper;
using SimpleTaskManagerAPI.Models;
using SimpleTaskManagerAPI.Models.Viewmodels.AppTask;

namespace SimpleTaskManagerAPI.Utilities.AutoMapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<CreateAppTaskDTO, AppTask>();
            CreateMap<UpdateAppTaskDTO, AppTask>();
        }
    }
}
