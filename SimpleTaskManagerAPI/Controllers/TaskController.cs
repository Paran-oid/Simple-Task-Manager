using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleTaskManagerAPI.Data.Services.TaskService;
using SimpleTaskManagerAPI.Models;
using SimpleTaskManagerAPI.Models.Viewmodels.AppTask;

namespace SimpleTaskManagerAPI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IAppTaskService _taskService;

        public TaskController(IAppTaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<List<AppTask>>> GetAll()
        {
            var tasks = await _taskService.GetAll();
            if (tasks == null)
            {
                return NotFound("Tasks not found");
            }
            return Ok(tasks);
        }

        [HttpGet("{ID}")]
        public async Task<ActionResult<AppTask>> Get([FromRoute] int ID)
        {
            var task = await _taskService.Get(ID);

            if (task == null)
            {
                return NotFound("Task wasn't found");
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<AppTask>> Post([FromBody] CreateAppTaskDTO model)
        {
            if (ModelState.IsValid)
            {
                var task = await _taskService.Post(model);
                if (task == null)
                {
                    return Conflict("There was an error creating the task");
                }
                return Ok(task);
            }

            return BadRequest("Please verify data submitted");
        }

        [HttpPut("{ID}")]
        public async Task<ActionResult<Task>> Put([FromRoute] int ID, [FromBody] UpdateAppTaskDTO model)
        {
            if (ModelState.IsValid)
            {
                var task = await _taskService.Put(ID, model);
                if (task == null)
                {
                    return NotFound("Couldn't find task");
                }
                return Ok(task);
            }
            return BadRequest("Please verify data submitted");
        }

        [HttpPut("{ID}")]
        public async Task<ActionResult<Task>> ToggleTask([FromRoute] int ID, [FromBody] string state)
        {
            if (ModelState.IsValid)
            {
                var task = await _taskService.ToggleTask(ID, state);
                if (task == null)
                {
                    return NotFound("Task wasn't found");
                }

                return Ok(task);
            }

            return BadRequest("Please verify data submitted");
        }

        [HttpDelete("{ID}")]
        public async Task<ActionResult<string>> Delete(int ID)
        {
            var result = await _taskService.Delete(ID);

            if (result == null)
            {
                return Conflict("Couldn't delete task");
            }

            return Ok(result);
        }
    }
}