namespace ProyectoAnalisis.Data
{
    using Microsoft.EntityFrameworkCore;
    using ProyectoAnalisis.Model;
    using System.Collections.Generic;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Reparacion> Reparaciones { get; set; }

        public DbSet<Cita> Citas { get; set; }
    }

}
