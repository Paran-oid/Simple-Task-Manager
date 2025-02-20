﻿namespace SimpleTaskManagerAPI.Models
{
    public class AppTask
    {
        public int ID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string Status { get; set; } = "Ongoing";
        public bool Important { get; set; } = false;
        public DateOnly? Date { get; set; }
    }
}