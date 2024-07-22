using SimpleTaskManagerAPI.Models;
using SimpleTaskManagerAPI.Models.Viewmodels.AppTask;

namespace SimpleTaskManagerAPI.Data.Services.TaskService
{
    public interface IAppTaskService
    {
        public Task<List<AppTask>> GetAll();

        public Task<AppTask?> Get(int ID);

        public Task<AppTask?> Post(CreateAppTaskDTO model);

        public Task<AppTask?> Put(int ID, UpdateAppTaskDTO model);

        public Task<AppTask?> ToggleTask(int ID, string state);

        public Task<AppTask?> TaskImportanceToggle(int ID);

        public Task<string?> Delete(int ID);
    }
}