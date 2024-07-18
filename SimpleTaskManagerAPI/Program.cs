using Microsoft.EntityFrameworkCore;
using SimpleTaskManagerAPI.Data;
using SimpleTaskManagerAPI.Data.Services.TaskService;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("Default", builder =>
    {
        builder
        .AllowAnyHeader()
        .AllowCredentials()
        .WithOrigins("http://localhost:4200")
        .AllowAnyMethod();

    });
});

//PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("Default"))
);

//Automapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

//scopes
builder.Services.AddScoped<IAppTaskService, AppTaskService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Default");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
