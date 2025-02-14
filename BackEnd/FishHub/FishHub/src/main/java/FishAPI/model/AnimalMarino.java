package FishAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "animalesMarinos")
public class AnimalMarino {
	@Id
	private String id;
	private int id_animalMarino;
	private String nombre;
	private int id_familia;
	private int id_localizacion;
	private Double tamanyoPromedio;
	private Double pesoPromedio;
	private String descripcion;
	private int id_tipoDeAgua;
	private int profundidad;
	private String foto;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public int getId_animalMarino() {
		return id_animalMarino;
	}

	public void setId_animalMarino(int id_animalMarino) {
		this.id_animalMarino = id_animalMarino;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getId_familia() {
		return id_familia;
	}

	public void setId_familia(int id_familia) {
		this.id_familia = id_familia;
	}

	public int getId_localizacion() {
		return id_localizacion;
	}

	public void setId_localizacion(int id_localizacion) {
		this.id_localizacion = id_localizacion;
	}

	public Double getTamanyoPromedio() {
		return tamanyoPromedio;
	}

	public void setTamanyoPromedio(Double tamanyoPromedio) {
		this.tamanyoPromedio = tamanyoPromedio;
	}

	public Double getPesoPromedio() {
		return pesoPromedio;
	}

	public void setPesoPromedio(Double pesoPromedio) {
		this.pesoPromedio = pesoPromedio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getId_tipoDeAgua() {
		return id_tipoDeAgua;
	}

	public void setId_tipoDeAgua(int id_tipoDeAgua) {
		this.id_tipoDeAgua = id_tipoDeAgua;
	}

	public int getProfundidad() {
		return profundidad;
	}

	public void setProfundidad(int profundidad) {
		this.profundidad = profundidad;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

}
