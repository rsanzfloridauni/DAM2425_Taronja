package FishAPI.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "publicaciones")
public class Publicacion {
	@Id
	private String id;
	private int id_publicacion;
	private int id_Usuario;
	private Date fecha;
	private String titulo;
	private String descripcion;
	private String ubicacion;
	private int id_animalMarino;
	private String foto;
	
	public Publicacion(int id_publicacion, int id_Usuario, Date fecha, String titulo, String descripcion,
			String ubicacion, int id_animalMarino, String foto) {
		this.id_publicacion = id_publicacion;
		this.id_Usuario = id_Usuario;
		this.fecha = fecha;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.ubicacion = ubicacion;
		this.id_animalMarino = id_animalMarino;
		this.foto = foto;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public int getId_publicacion() {
		return id_publicacion;
	}

	public void setId_publicacion(int id_publicacion) {
		this.id_publicacion = id_publicacion;
	}

	public int getId_Usuario() {
		return id_Usuario;
	}

	public void setId_Usuario(int id_Usuario) {
		this.id_Usuario = id_Usuario;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public int getId_animalMarino() {
		return id_animalMarino;
	}

	public void setId_animalMarino(int id_animalMarino) {
		this.id_animalMarino = id_animalMarino;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}
}
