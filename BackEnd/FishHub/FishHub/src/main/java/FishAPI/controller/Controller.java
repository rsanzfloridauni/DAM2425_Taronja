package FishAPI.controller;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import FishAPI.model.Usuario;
import FishAPI.model.AnimalMarino;
import FishAPI.model.Avatar;
import FishAPI.model.Familia;
import FishAPI.model.Localizacion;
import FishAPI.model.Publicacion;
import FishAPI.model.TipoDeAgua;
import FishAPI.repository.AnimalMarinoRepository;
import FishAPI.repository.AvatarRepository;
import FishAPI.repository.FamiliaRepository;
import FishAPI.repository.LocalizacionRepository;
import FishAPI.repository.PublicacionRepository;
import FishAPI.repository.TipoDeAguaRepository;
import FishAPI.repository.UsuarioRepository;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Properties;
import java.util.Scanner;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.BodyPart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.Multipart;
import javax.mail.internet.MimeMultipart;
import javax.activation.*;


/**
 * Controlador principal de la API FishAPI.
 * Proporciona endpoints para autenticación, registro y recuperación de contraseña de usuarios.
 */
@RestController
public class Controller {

	@Autowired
	private AnimalMarinoRepository animalMarinoRepository;
	@Autowired
	private AvatarRepository avatarRepository;
	@Autowired
	private FamiliaRepository familiaRepository;
	@Autowired
	private LocalizacionRepository localizacionRepository;
	@Autowired
	private PublicacionRepository publicacionRepository;
	@Autowired
	private TipoDeAguaRepository tipoDeAguaRepository;
	@Autowired
	private UsuarioRepository usuarioRepository;

	private static ArrayList<String> tokens = new ArrayList<String>();

	
	/**
     * Endpoint para el inicio de sesión de usuarios.
     * 
     * @param cuerpoPeticion JSON con "nombreUsuario" y "contrasenya".
     * @return ResponseEntity con el token de sesión y datos del usuario si la autenticación es exitosa.
     */
	@PostMapping("FishAPI/login")
	ResponseEntity<Object> login(@RequestBody String cuerpoPeticion) {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		String nombreUsuario = (String) obj.get("nombreUsuario");
		String contrasenya = (String) obj.get("contrasenya");
		String contrasenyaCifrada = contrasenyaSHA256(contrasenya);
		Optional<Usuario> autorizat = usuarioRepository.findByNombreUsuarioAndContrasenya(nombreUsuario,
				contrasenyaCifrada);
		System.out.println(usuarioRepository.findAll());
		if (autorizat.isPresent() && !autorizat.get().getBaneado()) {
			String token = crearToken();
			tokens.add(token);
			JSONObject response = new JSONObject();
			response.put("token", token);
			response.put("id_usuario", autorizat.get().getId_usuario());
			response.put("nombreUsuario", autorizat.get().getNombreUsuario());
			response.put("id_avatar", autorizat.get().getId_avatar());
			response.put("foto", avatarRepository.findByIdAvatar(autorizat.get().getId_avatar()).get().getFoto());

			return ResponseEntity.status(HttpStatus.OK).body(response.toString());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("{\"message\": \"The username or password is incorrect.\"}");
		}
	}

	 /**
     * Endpoint para registrar un nuevo usuario.
     * 
     * @param cuerpoPeticion JSON con "nombreUsuario", "contrasenya" y "correoElectronico".
     * @return ResponseEntity indicando si el registro fue exitoso o falló.
     */
	@PostMapping("FishAPI/register")
	ResponseEntity<Object> register(@RequestBody String cuerpoPeticion) {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		String nombreUsuario = obj.get("nombreUsuario").toString().toLowerCase();
		String contrasenya = (String) obj.get("contrasenya");
		String correoElectronico = (String) obj.get("correoElectronico");

		Optional<Usuario> usuarioExiste = usuarioRepository.findByNombreUsuario(nombreUsuario);
		Optional<Usuario> correoExiste = usuarioRepository.findByCorreoElectronico(correoElectronico);

		if (usuarioExiste.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("{\"message\": \"Other person has that user.\"}");
		} else if (correoExiste.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("{\"message\": \"Other person use that email.\"}");
		} else {

			int numeroConfirmacion = (int) (Math.random() * 9_000_000) + 1_000_000;

			Usuario nuevoUsuario = new Usuario();
			String contrasenyaCifrada = contrasenyaSHA256(contrasenya);
			nuevoUsuario.setId_usuario((int) usuarioRepository.count() + 1);
			nuevoUsuario.setNombreUsuario(nombreUsuario);
			nuevoUsuario.setContrasenya(contrasenyaCifrada);
			nuevoUsuario.setCorreoElectronico(correoElectronico);
			nuevoUsuario.setId_avatar(numeroConfirmacion);
			nuevoUsuario.setBaneado(true);

			usuarioRepository.save(nuevoUsuario);

			try {
				envieMail(correoElectronico, numeroConfirmacion, "CONFIRM REGISTER",
						"Type in the register screen the next numbers:");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (MessagingException e) {
				e.printStackTrace();
			}

			return ResponseEntity.status(HttpStatus.CREATED)
					.body("{\"message\": \"Email sended.\"}");
		}
	}

	/**
     * Endpoint para confirmar el registro de un usuario.
     * 
     * @param cuerpoPeticion JSON con "numeroConfirmacion".
     * @return ResponseEntity con mensaje de éxito si la confirmación es válida, 
     *         o error si el número de confirmación es incorrecto.
     */
	@PostMapping("FishAPI/confirmRegister")
	ResponseEntity<Object> confirmRegister(@RequestBody String cuerpoPeticion) {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		int numeroConfirmacion = obj.getInt("numeroConfirmacion");

		Optional<Usuario> userPorConfirmar = usuarioRepository.findConfirmar(numeroConfirmacion, true);
		Usuario usuario = userPorConfirmar.get();
		if (userPorConfirmar.isPresent()) {
			Random random = new Random();
			int idAvatarAleatorio = random.nextInt((int) 28 + 1);
			usuario.setId_avatar(idAvatarAleatorio);
			usuario.setBaneado(false);
			usuarioRepository.save(usuario);
			return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"User registered correctly.\"}");

		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Number incorrect.\"}");
	}

	/**
     * Endpoint para recuperar la contraseña de un usuario.
     * 
     * @param cuerpoPeticion JSON con "correoElectronico".
     * @return ResponseEntity indicando si la recuperación fue exitosa.
     */
	@PostMapping("FishAPI/forgottenPassword")
	ResponseEntity<Object> forgottenPassword(@RequestBody String cuerpoPeticion) {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		String correoElectronico = (String) obj.get("correoElectronico");
		Optional<Usuario> usuarioExiste = usuarioRepository.findByCorreoElectronico(correoElectronico);
		if (usuarioExiste.isPresent()) {
			int contrasenya = (int) (Math.random() * 9_000_000) + 1_000_000;
			String nuevaContrasenya = String.valueOf(contrasenya);
			Usuario user = usuarioExiste.get();
			String contrasenyaConvertida = contrasenyaSHA256(nuevaContrasenya);
			user.setContrasenya(contrasenyaConvertida);
			usuarioRepository.save(user);
			try {
				envieMail(correoElectronico, contrasenya, "NEW PASSWORD", "Your new Password is:");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (MessagingException e) {
				e.printStackTrace();
			}
			return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Password changed.\"}");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("{\"message\": \"Mail doesn't exist.\"}");
		}
	}

	 /**
     * Obtiene información del usuario por su ID si el token es válido.
     *
     * @param id    Identificador del usuario.
     * @param token Token de autenticación.
     * @return ResponseEntity con los datos del usuario o el código de estado correspondiente.
     */
	@GetMapping("FishAPI/getUserID")
	public ResponseEntity<Object> getUserID(@RequestParam(value = "id", required = true) int id,
			@RequestParam(value = "token") String token) {
		if (tokenAutorizado(token)) {
			Optional<Usuario> usuario = usuarioRepository.findById(id);
			if (usuario.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				JSONObject jsonUser = new JSONObject();
				int id_avatar = usuario.get().getId_avatar();
				jsonUser.put("id_usuario", usuario.get().getId_usuario());
				jsonUser.put("nombreUsuario", usuario.get().getNombreUsuario());
				jsonUser.put("foto", avatarRepository.findByIdAvatar(id_avatar).get().getFoto());
				jsonUser.put("id_avatar", id_avatar);
				return ResponseEntity.status(HttpStatus.OK).body(jsonUser.toString());
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	/**
     * Obtiene la lista de avatares predeterminados si el token es válido.
     *
     * @param token Token de autenticación.
     * @return ResponseEntity con la lista de avatares o el código de estado correspondiente.
     */
	@GetMapping("FishAPI/getAvatares")
	public ResponseEntity<Object> getAvatares(@RequestParam(value = "token") String token) {
		if (tokenAutorizado(token)) {

			List<Avatar> avatares = avatarRepository.findDefaults();

			if (avatares.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				JSONObject response = new JSONObject();
				response.put("results", avatares);
				return ResponseEntity.status(HttpStatus.OK).body(response.toString());
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	 /**
     * Obtiene la lista de familias de peces si el token es válido.
     *
     * @param token Token de autenticación.
     * @return ResponseEntity con la lista de familias o el código de estado correspondiente.
     */
	@GetMapping("FishAPI/getFamilias")
	public ResponseEntity<Object> getFamilias(@RequestParam(value = "token") String token) {
		if (tokenAutorizado(token)) {

			List<Familia> familias = familiaRepository.findAll();

			if (familias.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				JSONObject response = new JSONObject();
				response.put("results", familias);
				return ResponseEntity.status(HttpStatus.OK).body(response.toString());
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	/**
     * Obtiene la lista de localizaciones disponibles si el token es válido.
     *
     * @param token Token de autenticación.
     * @return ResponseEntity con la lista de localizaciones o el código de estado correspondiente.
     */
	@GetMapping("FishAPI/getLocalizaciones")
	public ResponseEntity<Object> getLocalizaciones(@RequestParam(value = "token") String token) {
		if (tokenAutorizado(token)) {

			List<Localizacion> localizaciones = localizacionRepository.findAll();

			if (localizaciones.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				JSONObject response = new JSONObject();
				response.put("results", localizaciones);
				return ResponseEntity.status(HttpStatus.OK).body(response.toString());
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	 /**
     * Obtiene la lista de tipos de agua disponibles si el token es válido.
     *
     * @param token Token de autenticación.
     * @return ResponseEntity con la lista de tipos de agua o el código de estado correspondiente.
     */
	@GetMapping("FishAPI/getTiposAgua")
	public ResponseEntity<Object> getTiposAgua(@RequestParam(value = "token") String token) {
		if (tokenAutorizado(token)) {

			List<TipoDeAgua> tiposDeAgua = tipoDeAguaRepository.findAll();

			if (tiposDeAgua.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				JSONObject response = new JSONObject();
				response.put("results", tiposDeAgua);
				return ResponseEntity.status(HttpStatus.OK).body(response.toString());
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	
	/**
	 * Obtiene una lista de animales marinos filtrados por diversos criterios opcionales.
	 *
	 * @param nombre Nombre opcional del animal marino.
	 * @param familiaId ID opcional de la familia del animal.
	 * @param localizacionId ID opcional de la localización del animal.
	 * @param pesoMin Peso mínimo opcional del animal.
	 * @param pesoMax Peso máximo opcional del animal.
	 * @param tamanyoMin Tamaño mínimo opcional del animal.
	 * @param tamanyoMax Tamaño máximo opcional del animal.
	 * @param tipoAguaId ID opcional del tipo de agua donde habita el animal.
	 * @param token Token de autenticación.
	 * @return Lista de animales marinos filtrados o un código de estado HTTP.
	 */
	@GetMapping("FishAPI/animalesMarinos")
	public ResponseEntity<Object> getAnimalesMarinos(@RequestParam(value = "nombre", required = false) String nombre,
			@RequestParam(value = "familia", required = false) Long familiaId,
			@RequestParam(value = "localizacion", required = false) Long localizacionId,
			@RequestParam(value = "pesoMin", required = false) Double pesoMin,
			@RequestParam(value = "pesoMax", required = false) Double pesoMax,
			@RequestParam(value = "tamanyoMin", required = false) Double tamanyoMin,
			@RequestParam(value = "tamanyoMax", required = false) Double tamanyoMax,
			@RequestParam(value = "tipoAgua", required = false) Long tipoAguaId,
			@RequestParam(value = "token") String token) {

		if (!tokenAutorizado(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		List<AnimalMarino> allAnimals = animalMarinoRepository.findAll();
		List<AnimalMarino> filteredAnimals = new ArrayList<>();

		if (nombre != null && !nombre.isEmpty()) {
			for (AnimalMarino animal : allAnimals) {
				if (animal.getNombre().toLowerCase().contains(nombre.toLowerCase())) {
					filteredAnimals.add(animal);
				}
			}
		} else {
			filteredAnimals.addAll(allAnimals);

			if (familiaId != null && familiaId != -1) {
				filteredAnimals.removeIf(animal -> animal.getId_familia() != familiaId);
			}

			if (localizacionId != null && localizacionId != -1) {
				filteredAnimals.removeIf(animal -> animal.getId_localizacion() != localizacionId);
			}

			if (tipoAguaId != null && tipoAguaId != -1) {
				filteredAnimals.removeIf(animal -> animal.getId_tipoDeAgua() != tipoAguaId);
			}

			if (pesoMin != null) {
				filteredAnimals.removeIf(animal -> animal.getPesoPromedio() < pesoMin);
			}

			if (pesoMax != null) {
				filteredAnimals.removeIf(animal -> animal.getPesoPromedio() > pesoMax);
			}

			if (tamanyoMin != null) {
				filteredAnimals.removeIf(animal -> animal.getTamanyoPromedio() < tamanyoMin);
			}

			if (tamanyoMax != null) {
				filteredAnimals.removeIf(animal -> animal.getTamanyoPromedio() > tamanyoMax);
			}
		}

		JSONArray results = new JSONArray();
		JSONObject response = new JSONObject();

		if (filteredAnimals.size() == 0) {
			response.put("results", results);
			return ResponseEntity.status(HttpStatus.OK).body(response.toString());
		}

		for (AnimalMarino animal : filteredAnimals) {
			JSONObject jsonAnimal = new JSONObject();
			jsonAnimal.put("id_animal", animal.getId_animalMarino());
			jsonAnimal.put("nombre", animal.getNombre());
			jsonAnimal.put("familia",
					familiaRepository.findById(animal.getId_familia()).map(Familia::getNombre).orElse("Desconocido"));
			jsonAnimal.put("localizacion", localizacionRepository.findById(animal.getId_localizacion())
					.map(Localizacion::getNombre).orElse("Desconocido"));
			jsonAnimal.put("tipoAgua", tipoDeAguaRepository.findById(animal.getId_tipoDeAgua())
					.map(TipoDeAgua::getNombre).orElse("Desconocido"));
			jsonAnimal.put("pesoPromedio", animal.getPesoPromedio());
			jsonAnimal.put("tamanyoPromedio", animal.getTamanyoPromedio());
			jsonAnimal.put("descripcion", animal.getDescripcion());
			jsonAnimal.put("profundidad", animal.getProfundidad());
			jsonAnimal.put("foto", animal.getFoto());
			results.put(jsonAnimal);
		}

		response.put("results", results);

		return ResponseEntity.status(HttpStatus.OK).body(response.toString());
	}

	
	/**
	 * Obtiene las publicaciones de un usuario específico.
	 *
	 * @param token Token de autenticación.
	 * @param id ID opcional del usuario.
	 * @return Lista de publicaciones del usuario o un código de estado HTTP.
	 */
	@GetMapping("FishAPI/PostsPerfil")
	public ResponseEntity<Object> getPostsPerfil(@RequestParam(value = "token") String token,
			@RequestParam(value = "id", required = false) int id) {

		if (tokenAutorizado(token)) {

			List<Publicacion> posts;

			posts = publicacionRepository.findByIdUsuario(id);

			JSONArray results = new JSONArray();
			for (Publicacion post : posts) {
				Optional<Usuario> usuario = usuarioRepository.findById(post.getId_Usuario());

				JSONObject jsonPost = new JSONObject();
				jsonPost.put("id_publicacion", post.getId_publicacion());
				jsonPost.put("titulo", post.getTitulo());
				jsonPost.put("descripcion", post.getDescripcion());
				jsonPost.put("id_usuario", post.getId_Usuario());
				jsonPost.put("nombreUsuario", usuario.map(Usuario::getNombreUsuario).orElse("Desconocido"));
				jsonPost.put("fecha", post.getFecha());
				jsonPost.put("ubicacion", post.getUbicacion());
				jsonPost.put("foto", post.getFoto());

				Optional<AnimalMarino> animal = animalMarinoRepository.findById(post.getId_animalMarino());
				if (animal.isPresent()) {
					JSONObject jsonAnimal = new JSONObject();
					jsonAnimal.put("id_animalMarino", animal.get().getId_animalMarino());
					jsonAnimal.put("nombre", animal.get().getNombre());
					jsonAnimal.put("familia", familiaRepository.findById(animal.get().getId_familia())
							.map(Familia::getNombre).orElse("Desconocido"));
					jsonAnimal.put("localizacion", localizacionRepository.findById(animal.get().getId_localizacion())
							.map(Localizacion::getNombre).orElse("Desconocido"));
					jsonAnimal.put("tipoAgua", tipoDeAguaRepository.findById(animal.get().getId_tipoDeAgua())
							.map(TipoDeAgua::getNombre).orElse("Desconocido"));
					jsonAnimal.put("pesoPromedio", animal.get().getPesoPromedio());
					jsonAnimal.put("tamanyoPromedio", animal.get().getTamanyoPromedio());
					jsonAnimal.put("descripcion", animal.get().getDescripcion());
					jsonAnimal.put("profundidad", animal.get().getProfundidad());
					jsonAnimal.put("foto", animal.get().getFoto());

					jsonPost.put("animal", jsonAnimal);
				} else {
					jsonPost.put("animal", "Desconocido");
				}

				results.put(jsonPost);

			}

			JSONObject response = new JSONObject();
			response.put("results", results);
			return ResponseEntity.status(HttpStatus.OK).body(response.toString());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	
	/**
	 * Obtiene todas las publicaciones, filtradas opcionalmente por fecha o nombre de usuario.
	 *
	 * @param token Token de autenticación.
	 * @param fecha Filtro opcional por rango de fecha.
	 * @param nombreUsuario Filtro opcional por nombre de usuario.
	 * @return Lista de publicaciones filtradas o un código de estado HTTP.
	 */
	@GetMapping("FishAPI/Posts")
	public ResponseEntity<Object> getPosts(@RequestParam(value = "token") String token,
			@RequestParam(value = "fecha", required = false) String fecha,
			@RequestParam(value = "nombreUsuario", required = false) String nombreUsuario) {

		if (tokenAutorizado(token)) {
			if (fecha == null) {
				fecha = "Todos";
			}
			Date fechaInicio = null;
			Date fechaFin = new Date();
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(fechaFin);

			switch (fecha) {
			case "Hoy":
				calendar.set(Calendar.HOUR_OF_DAY, 0);
				calendar.set(Calendar.MINUTE, 0);
				calendar.set(Calendar.SECOND, 0);
				fechaInicio = calendar.getTime();
				break;
			case "Semanal":
				calendar.add(Calendar.DAY_OF_MONTH, -7);
				fechaInicio = calendar.getTime();
				break;
			case "Mensual":
				calendar.add(Calendar.MONTH, -1);
				fechaInicio = calendar.getTime();
				break;
			case "Anual":
				calendar.add(Calendar.YEAR, -1);
				fechaInicio = calendar.getTime();
				break;
			case "Todos":
			default:
				fechaInicio = null;
			}

			int idUsuario = -1;
			if (nombreUsuario != null && !nombreUsuario.isEmpty()) {
				Optional<Usuario> usuario = usuarioRepository.findByNombreUsuario(nombreUsuario);
				if (usuario.isPresent()) {
					idUsuario = usuario.get().getId_usuario();
				} else {
					idUsuario = -2;
				}
			}

			List<Publicacion> posts;
			if (fechaInicio != null && idUsuario != -1) {
				posts = publicacionRepository.findByFechaBetweenAndIdUsuario(fechaInicio, fechaFin, idUsuario);
			} else if (fechaInicio != null) {
				posts = publicacionRepository.findByFechaBetween(fechaInicio, fechaFin);
			} else if (idUsuario != -1) {
				posts = publicacionRepository.findByIdUsuario(idUsuario);
			} else {
				posts = publicacionRepository.findAll();
			}

			JSONArray results = new JSONArray();
			for (Publicacion post : posts) {
				Optional<Usuario> usuario = usuarioRepository.findById(post.getId_Usuario());

				if (!usuario.get().getBaneado()) {
					JSONObject jsonPost = new JSONObject();
					jsonPost.put("id_publicacion", post.getId_publicacion());
					jsonPost.put("titulo", post.getTitulo());
					jsonPost.put("descripcion", post.getDescripcion());
					jsonPost.put("id_usuario", post.getId_Usuario());
					jsonPost.put("nombreUsuario", usuario.map(Usuario::getNombreUsuario).orElse("Desconocido"));
					jsonPost.put("fecha", post.getFecha());
					jsonPost.put("ubicacion", post.getUbicacion());
					jsonPost.put("foto", post.getFoto());

					Optional<AnimalMarino> animal = animalMarinoRepository.findById(post.getId_animalMarino());
					if (animal.isPresent()) {
						JSONObject jsonAnimal = new JSONObject();
						jsonAnimal.put("id_animalMarino", animal.get().getId_animalMarino());
						jsonAnimal.put("nombre", animal.get().getNombre());
						jsonAnimal.put("familia", familiaRepository.findById(animal.get().getId_familia())
								.map(Familia::getNombre).orElse("Desconocido"));
						jsonAnimal.put("localizacion",
								localizacionRepository.findById(animal.get().getId_localizacion())
										.map(Localizacion::getNombre).orElse("Desconocido"));
						jsonAnimal.put("tipoAgua", tipoDeAguaRepository.findById(animal.get().getId_tipoDeAgua())
								.map(TipoDeAgua::getNombre).orElse("Desconocido"));
						jsonAnimal.put("pesoPromedio", animal.get().getPesoPromedio());
						jsonAnimal.put("tamanyoPromedio", animal.get().getTamanyoPromedio());
						jsonAnimal.put("descripcion", animal.get().getDescripcion());
						jsonAnimal.put("profundidad", animal.get().getProfundidad());
						jsonAnimal.put("foto", animal.get().getFoto());

						jsonPost.put("animal", jsonAnimal);
					} else {
						jsonPost.put("animal", "Desconocido");
					}

					results.put(jsonPost);
				}
			}

			JSONObject response = new JSONObject();
			response.put("results", results);
			return ResponseEntity.status(HttpStatus.OK).body(response.toString());
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	
	/**
	 * Endpoint para subir una nueva publicación en la plataforma.
	 * 
	 * 
	 * @param cuerpoPeticion El cuerpo de la solicitud en formato JSON, que contiene
	 *                       los datos de la nueva publicación, incluido el token,
	 *                       id_usuario, título, descripción, ubicación, id_animalMarino y foto.
	 * @return ResponseEntity El resultado de la operación, que será una respuesta HTTP con el estado
	 *                        correspondiente (NO_CONTENT o UNAUTHORIZED).
	 */
	@PostMapping("FishAPI/subirPost")
	ResponseEntity<Object> subirPost(@RequestBody String cuerpoPeticion) {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		String token = (String) obj.get("token");
		if (tokenAutorizado(token)) {

			List<Publicacion> publicaciones = publicacionRepository.findAll();
			List<Integer> idsExistentes = new ArrayList<>();

			for (Publicacion publicacion : publicaciones) {
				idsExistentes.add(publicacion.getId_publicacion());
			}

			int id_publicacion = 1;
			while (idsExistentes.contains(id_publicacion)) {
				id_publicacion++;
			}

			int id_usuario = obj.getInt("id_usuario");
			Date fecha = new Date();
			String titulo = (String) obj.get("titulo");
			String descripcion = (String) obj.get("descripcion");
			String ubicacion = (String) obj.get("ubicacion");
			int id_animalMarino = obj.getInt("id_animalMarino");
			String foto = (String) obj.get("foto");
			Publicacion nuevaPublicacion = new Publicacion(id_publicacion, id_usuario, fecha, titulo, descripcion,
					ubicacion, id_animalMarino, foto);
			publicacionRepository.save(nuevaPublicacion);

			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	/**
	 * Endpoint para actualizar el perfil de un usuario.
	 * 
	 * @param cuerpoPeticion El cuerpo de la solicitud en formato JSON, que contiene
	 *                       el token de autorización, el nombre de usuario, id_usuario,
	 *                       id_avatar y foto. 
	 * @return ResponseEntity El resultado de la operación, que será una respuesta HTTP con el estado
	 *                        correspondiente (OK, UNAUTHORIZED o NOT_FOUND) y un mensaje relevante.
	 */
	@PostMapping("FishAPI/actualizarPerfil")
	ResponseEntity<Object> actualizarPerfil(@RequestBody String cuerpoPeticion) {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		String token = (String) obj.get("token");
		if (tokenAutorizado(token)) {
			String nombreUsuario = (String) obj.get("nombreUsuario");
			int id_usuario = (int) obj.get("id_usuario");
			int id_avatar = (int) obj.get("id_avatar");
			String foto = (String) obj.get("foto");

			if (id_avatar == -1) {
				List<Avatar> avatares = avatarRepository.findAll();
				List<Integer> idsExistentes = new ArrayList<>();

				for (Avatar avatar : avatares) {
					idsExistentes.add(avatar.getId_avatar());
				}

				int id_nuevoAvatar = 1;
				while (idsExistentes.contains(id_nuevoAvatar)) {
					id_nuevoAvatar++;
				}

				Avatar nuevoAvatar = new Avatar();
				nuevoAvatar.setId_avatar(id_nuevoAvatar);
				nuevoAvatar.setNombre("Custom");
				nuevoAvatar.setFoto(foto);
				avatarRepository.save(nuevoAvatar);
				id_avatar = id_nuevoAvatar;
			}

			Optional<Usuario> usuarioOpt = usuarioRepository.findById(id_usuario);

			if (usuarioOpt.isPresent()) {
				Usuario usuario = usuarioOpt.get();

				if (nombreUsuario != null && !nombreUsuario.isEmpty()) {
					Optional<Usuario> usuarioExiste = usuarioRepository.findByNombreUsuario(nombreUsuario);

					if (!usuarioExiste.isPresent() || usuario.getId_usuario() == usuarioExiste.get().getId_usuario()) {
						usuario.setNombreUsuario(nombreUsuario);
					} else {
						return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
								.body("{\"message\": \"El nombre de usuario ya está en uso.\"}");
					}
				}
				usuario.setId_avatar(id_avatar);

				usuarioRepository.save(usuario);

				return ResponseEntity.status(HttpStatus.OK)
						.body("{\"message\": \"Perfil actualizado correctamente.\"}");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Usuario no encontrado.\"}");
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	/**
	 * Genera un hash SHA-256 de una contraseña.
	 * 
	 * 
	 * @param contrasenya La contraseña que se desea convertir a hash.
	 * @return String El hash de la contraseña en formato hexadecimal.
	 * @throws RuntimeException Si ocurre un error al generar el hash.
	 */
	private String crearToken() {
		String uuid = UUID.randomUUID().toString();
		String token = uuid.split("-")[0];
		return token;
	}

	public String contrasenyaSHA256(String contrasenya) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");

			byte[] hash = digest.digest(contrasenya.getBytes("UTF-8"));

			StringBuilder hexString = new StringBuilder();
			for (byte b : hash) {
				String hex = Integer.toHexString(0xff & b);
				if (hex.length() == 1)
					hexString.append('0');
				hexString.append(hex);
			}
			return hexString.toString();
		} catch (Exception e) {
			throw new RuntimeException("Error al generar el hash SHA-256", e);
		}
	}

	/**
	 * Verifica si un token de autenticación es válido.
	 * 
	 * 
	 * @param token El token que se desea verificar.
	 * @return boolean True si el token es válido, false en caso contrario.
	 */
	private boolean tokenAutorizado(String token) {
		for (String tok : tokens) {
			if (tok.equals(token)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Envia un correo electrónico con los detalles de una nueva contraseña o codigo de registro.
	 * 
	 * 
	 * @param destinatari La dirección de correo electrónico del destinatario.
	 * @param newPassword La nueva contraseña que se incluirá en el correo.
	 * @param asunto El asunto del correo electrónico.
	 * @param body El cuerpo del correo electrónico.
	 * @throws UnsupportedEncodingException Si ocurre un error con la codificación de caracteres.
	 * @throws MessagingException Si ocurre un error al enviar el correo.
	 */
	public static void envieMail(String destinatari, int newPassword, String asunto, String body)
			throws UnsupportedEncodingException, MessagingException {
		Properties props = System.getProperties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.user", "FishHubProject@gmail.com");
		props.put("mail.smtp.password", "crjn udur mzkm ishs");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", "587");
		Session session = Session.getDefaultInstance(props);
		MimeMessage message = new MimeMessage(session);
		message.setFrom(new InternetAddress("FishHubProject@gmail.com"));
		message.addRecipients(Message.RecipientType.TO, destinatari);
		message.setSubject(asunto);
		BodyPart messageBodyPart1 = new MimeBodyPart();
		messageBodyPart1.setText(body + " " + newPassword);
		Multipart multipart = new MimeMultipart();
		multipart.addBodyPart(messageBodyPart1);
		message.setContent(multipart);
		Transport transport = session.getTransport("smtp");
		transport.connect("smtp.gmail.com", "FishHubProject@gmail.com", "crjn udur mzkm ishs");
		transport.sendMessage(message, message.getAllRecipients());
		transport.close();
	}

}
