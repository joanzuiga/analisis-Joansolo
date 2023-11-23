using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using ProyectoAnalisis.Model;

namespace ProyectoAnalisis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private string connectionString;

        public UserController(IConfiguration configuration)
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
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                List<User> users = new List<User>();

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM usuario";

                    MySqlCommand cmd = new MySqlCommand(query, connection);

                    using (MySqlDataReader reader = (MySqlDataReader) await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            User user = new User
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Nombre = reader["nombre"].ToString(),
                                Apellido = reader["apellido"].ToString(),
                                Correo = reader["correo"].ToString(),
                                Contrasena = reader["contrasena"].ToString(),
                                Telefono = reader["telefono"].ToString(),
                                Direccion = reader["direccion"].ToString(),
                                Tipo = reader["tipo"].ToString() //tipo
                            };
                            users.Add(user);
                        }
                    }
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetUserById(int id) 
        {
            try
            {
                User myUser = null;
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM usuario where usuario.id = "+id;

                    MySqlCommand cmd = new MySqlCommand(query, connection);

                    using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            User user = new User
                           
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Nombre = reader["nombre"].ToString(),
                                Apellido = reader["apellido"].ToString(),
                                Correo = reader["correo"].ToString(),
                                Contrasena = reader["contrasena"].ToString(),
                                Telefono = reader["telefono"].ToString(),
                                Direccion = reader["direccion"].ToString(),
                                Tipo = reader["tipo"].ToString()

                            };
                            myUser = user;
                        }
                    }
                }

                return Ok(myUser);
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "INSERT INTO usuario (nombre, apellido, correo, contrasena, telefono, direccion, tipo) " +
                                   "VALUES (@Nombre, @Apellido, @Correo, @Contrasena, @Telefono, @Direccion,@Tipo)";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Nombre", user.Nombre);
                    cmd.Parameters.AddWithValue("@Apellido", user.Apellido);
                    cmd.Parameters.AddWithValue("@Correo", user.Correo);
                    cmd.Parameters.AddWithValue("@Contrasena", user.Contrasena);
                    cmd.Parameters.AddWithValue("@Telefono", user.Telefono);
                    cmd.Parameters.AddWithValue("@Direccion", user.Direccion);
                    cmd.Parameters.AddWithValue("@Tipo", user.Tipo);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Usuario agregado con éxito");
                    }
                    else
                    {
                        return BadRequest("No se pudo agregar el usuario");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "UPDATE usuario " +
                                   "SET nombre = @Nombre, apellido = @Apellido, correo = @Correo, " +
                                   "contrasena = @Contrasena, telefono = @Telefono, direccion = @Direccion , tipo = @Tipo " +
                                   "WHERE id = @Id";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Id", user.Id);
                    cmd.Parameters.AddWithValue("@Nombre", user.Nombre);
                    cmd.Parameters.AddWithValue("@Apellido", user.Apellido);
                    cmd.Parameters.AddWithValue("@Correo", user.Correo);
                    cmd.Parameters.AddWithValue("@Contrasena", user.Contrasena);
                    cmd.Parameters.AddWithValue("@Telefono", user.Telefono);
                    cmd.Parameters.AddWithValue("@Direccion", user.Direccion);
                    cmd.Parameters.AddWithValue("@Tipo", user.Tipo);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Usuario modificado con éxito");
                    }
                    else
                    {
                        return BadRequest("No se pudo modificar el usuario");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
  
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "DELETE FROM usuario WHERE id = @Id";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Id", id);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Usuario eliminado con éxito");
                    }
                    else
                    {
                        return NotFound("No se encontró el usuario con el ID especificado");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] LoginRequest userLogin)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM usuario WHERE correo = @Correo AND contrasena = @Contrasena";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Correo", userLogin.Correo);
                    cmd.Parameters.AddWithValue("@Contrasena", userLogin.Contrasena);

                    using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            User user = new User
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Nombre = reader["nombre"].ToString(),
                                Apellido = reader["apellido"].ToString(),
                                Correo = reader["correo"].ToString(),
                                Contrasena = reader["contrasena"].ToString(),
                                Telefono = reader["telefono"].ToString(),
                                Direccion = reader["direccion"].ToString(),
                                Tipo = reader["tipo"].ToString()
                            };

                            return Ok(user);
                        }
                        else
                        {
                            return Unauthorized("Credenciales incorrectas");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }



    }//endclass
}