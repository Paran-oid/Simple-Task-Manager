namespace SimpleTaskManagerAPI.Models.Viewmodels.AppTask
{
    public class CreateAppTaskDTO
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public DateOnly? Date { get; set; }
    }
}