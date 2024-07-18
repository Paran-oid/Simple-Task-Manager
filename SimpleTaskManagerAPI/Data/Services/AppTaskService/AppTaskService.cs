using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleTaskManagerAPI.Models;
using SimpleTaskManagerAPI.Models.Viewmodels.AppTask;

namespace SimpleTaskManagerAPI.Data.Services.TaskService
{
    public class AppTaskService : IAppTaskService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public async Task<List<AppTask>> GetAll()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return tasks;
        }

        public async Task<AppTask?> Get([FromRoute] int ID)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.ID == ID);
            return task;
        }

        public AppTaskService(IMapper mapper, AppDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<AppTask?> Post(CreateAppTaskDTO model)
        {
            var task = _mapper.Map<AppTask>(model);

            _context.Add(task);
            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<AppTask?> Put(int ID, UpdateAppTaskDTO model)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.ID == ID);
            if (task == null)
            {
                return null;
            }

            _mapper.Map(model, task);
            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<AppTask?> ToggleTask(int ID, string state)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.ID == ID);

            if (task == null)
            {
                return task;
            }

            task.Status = state;
            await _context.SaveChangesAsync();

            return task;
        }

        public async Task<string?> Delete(int ID)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.ID == ID);
            if (task == null)
            {
                return null;
            }
            _context.Remove(task);
            await _context.SaveChangesAsync();

            return "Successfully deleted task";
        }
    }
}