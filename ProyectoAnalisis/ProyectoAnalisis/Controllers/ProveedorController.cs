using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using ProyectoAnalisis.Model;

namespace ProyectoAnalisis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProveedorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private string connectionString;

        public ProveedorController(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = "Server=localhost;Database=proyecto;User=root;Password=12345;";
        }

        [HttpGet("[action]")]
        public string Version()
        {
            return "V1.0";
        }

        [HttpGet("[action]")]


        public async Task<IActionResult> GetAllProveedores()
        {
            try 
            {
                List<Proveedor> proveedores = new List<Proveedor>();

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM proveedores";

                    MySqlCommand cmd = new MySqlCommand(query, connection);


                    using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Proveedor proveedor = new Proveedor 
                            { 
                                Id = Convert.ToInt32(reader["id"]),
                                Nombre = reader["nombre"].ToString(),
                                Correo = reader["correo"].ToString(),
                                Telefono = reader["telefono"].ToString(),
                                Ubicacion = reader["ubicacion"].ToString(),
                                Tipo = reader["tipo"].ToString()
                            };
                            proveedores.Add(proveedor);
                        }
                    }
                }
                return Ok(proveedores);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetProveedorById(int id)
        {
            try 
            { 
                Proveedor myProveedor = null;
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM proveedores where proveedor.id = " + id;

                    MySqlCommand cmd = new MySqlCommand(query, connection);

                    using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Proveedor proveedor = new Proveedor
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Nombre = reader["nombre"].ToString(),
                                Correo = reader["correo"].ToString(),
                                Telefono = reader["telefono"].ToString(),
                                Ubicacion = reader["ubicacion"].ToString(),
                                Tipo = reader["tipo"].ToString()
                            };

                            myProveedor = proveedor;
                        }

                    }
                }
                return Ok(myProveedor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddProveedor([FromBody] Proveedor proveedor)
        {
            try 
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    string query = "INSERT INTO proveedores (nombre, correo, telefono, ubicacion, tipo) " +
                                   "VALUES (@Nombre, @Correo, @Telefono, @Ubicacion, @Tipo)";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Nombre", proveedor.Nombre);
                    cmd.Parameters.AddWithValue("@Correo", proveedor.Correo);
                    cmd.Parameters.AddWithValue("@Telefono", proveedor.Telefono);
                    cmd.Parameters.AddWithValue("@Direccion", proveedor.Ubicacion);
                    cmd.Parameters.AddWithValue("@Tipo", proveedor.Tipo);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Proveedor agregado con éxito");
                    }
                    else
                    {
                        return BadRequest("No se pudo agregar el proveedor");
                    }

                }



            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateProveedor([FromBody] Proveedor proveedor)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "UPDATE proveedor " +
                                   "SET nombre = @Nombre, correo = @Correo, telefono = @Telefono, " +
                                   "ubicacion = @Ubicacion , tipo = @Tipo " +
                                   "WHERE id = @Id";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Id", proveedor.Id);
                    cmd.Parameters.AddWithValue("@Nombre", proveedor.Nombre);
                    cmd.Parameters.AddWithValue("@Correo", proveedor.Correo);
                    cmd.Parameters.AddWithValue("@Telefono", proveedor.Telefono);
                    cmd.Parameters.AddWithValue("@Ubicacion", proveedor.Ubicacion);
                    cmd.Parameters.AddWithValue("@Tipo", proveedor.Tipo);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Proveedor modificado con éxito");
                    }
                    else
                    {
                        return BadRequest("No se pudo modificar el proveedor");
                    }
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

        }

        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteProveedor(int id)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "DELETE FROM proveedores WHERE id = @Id";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Id", id);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Proveedor eliminado con éxito");
                    }
                    else
                    {
                        return NotFound("No se encontró el proveedor");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

        }


        }
}
