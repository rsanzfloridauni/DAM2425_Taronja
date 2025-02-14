package FishAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import FishAPI.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

	// BÚSQUEDA POR USUARIO Y CONTRASEÑA
	@Query("{ 'nombreUsuario': ?0, 'contrasenya': ?1}")
	Optional<Usuario> findByNombreUsuarioAndContrasenya(String nombreUsuario, String contrasenya);

	// BÚSQUEDA POR ID
	@Query("{ 'id_usuario': ?0}")
	Optional<Usuario> findById(int id_usuario);

	// BÚSQUEDA POR NOMBRE
	@Query("{ 'nombreUsuario': ?0}")
	Optional<Usuario> findByNombreUsuario(String nombreUsuario);
	
	// BÚSQUEDA PARA CONFIRMAR REGISTROS
	@Query("{ 'id_avatar': ?0, 'baneado': ?1'}")
	Optional<Usuario> findConfirmar(int numAvatar, boolean ban);

	// BÚSQUEDA POR CORREO ELECTRÓNICO
	@Query("{ 'correoElectronico': ?0}")
	Optional<Usuario> findByCorreoElectronico(String correoElectronico);

	// BÚSQUEDA POR CORREO ELECTRÓNICO Y NOMBRE DE USUARIO
	@Query("{ 'nombreUsuario': ?0, 'correoElectronico': ?1}")
	Optional<Usuario> findByCorreoElectronicoAndNombreUsuario(String nombreUsuario, String correoElectronico);
}
