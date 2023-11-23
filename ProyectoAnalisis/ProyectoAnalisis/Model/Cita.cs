namespace ProyectoAnalisis.Model
{
    public class Cita
    {
        public int Id { get; set; }
        public string NombreCliente { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public DateTime Fecha { get; set; }
        public TimeSpan Hora { get; set; }
    }
}
