using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using ProyectoAnalisis.Model;

namespace ProyectoAnalisis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private string connectionString;

        public ProductController(IConfiguration configuration)
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
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                List<Product> products = new List<Product>();

                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM producto";

                    MySqlCommand cmd = new MySqlCommand(query, connection);

                    using (MySqlDataReader reader = (MySqlDataReader) await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Product product = new Product
                            {
                                Codigo = Convert.ToInt32(reader["codigo"]),
                                Marca = reader["marca"].ToString(),
                                Modelo = reader["modelo"].ToString(),
                                Precio = Convert.ToInt32(reader["precio"]),
                                Tipo = reader["tipo"].ToString(),
                                
                            };
                            products.Add(product);
                        }
                    }
                }

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpGet("[action]/{codigo}")]
        public async Task<IActionResult> GetProductsByCode(int codigo) 
        {
            try
            {
                Product myProduct = null;
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "SELECT * FROM producto where producto.codigo = "+codigo;

                    MySqlCommand cmd = new MySqlCommand(query, connection);

                    using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            Product product = new Product
                           
                            {
                                Codigo = Convert.ToInt32(reader["codigo"]),
                                Marca = reader["marca"].ToString(),
                                Modelo = reader["modelo"].ToString(),
                                Precio = Convert.ToInt32(reader["precio"]),
                                Tipo = reader["tipo"].ToString(),
                            };
                            myProduct = product;
                        }
                    }
                }

                return Ok(myProduct);
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "INSERT INTO producto (marca, modelo, precio, tipo) " +
                                   "VALUES (@Marca, @Modelo, @Precio, @Tipo)";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Marca", product.Marca);
                    cmd.Parameters.AddWithValue("@Modelo", product.Modelo);
                    cmd.Parameters.AddWithValue("@Precio", product.Precio);
                    cmd.Parameters.AddWithValue("@Tipo", product.Tipo);
                  

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Producto agregado con éxito");
                    }
                    else
                    {
                        return BadRequest("No se pudo agregar el producto");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateProduct([FromBody] Product product)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "UPDATE producto " +
                                   "SET marca = @Marca, modelo = @Modelo, precio = @precio, " +
                                   "tipo = @Tipo " +
                                   "WHERE codigo = @Codigo";

                    MySqlCommand cmd = new MySqlCommand(query, connection);

                    cmd.Parameters.AddWithValue("@Codigo", product.Codigo);
                    cmd.Parameters.AddWithValue("@Marca", product.Marca);
                    cmd.Parameters.AddWithValue("@Modelo", product.Modelo);
                    cmd.Parameters.AddWithValue("@Precio", product.Precio);
                    cmd.Parameters.AddWithValue("@Tipo", product.Tipo);


                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Producto modificado con éxito");
                    }
                    else
                    {
                        return BadRequest("No se pudo modificar el producto");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
  
        [HttpDelete("[action]/{codigo}")]
        public async Task<IActionResult> DeleteProduct(int codigo)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    await connection.OpenAsync();

                    string query = "DELETE FROM producto WHERE codigo = @Codigo";

                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    cmd.Parameters.AddWithValue("@Codigo", codigo);

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();

                    if (rowsAffected > 0)
                    {
                        return Ok("Producto eliminado con éxito");
                    }
                    else
                    {
                        return NotFound("No se encontró el producto con el codigo especificado");
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
                                Direccion = reader["direccion"].ToString()
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