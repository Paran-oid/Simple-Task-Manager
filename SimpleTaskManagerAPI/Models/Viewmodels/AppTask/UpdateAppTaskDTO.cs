namespace SimpleTaskManagerAPI.Models.Viewmodels.AppTask
{
    public class UpdateAppTaskDTO
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public DateOnly? Date { get; set; }
    }
}