package FishAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuarios")
public class Usuario {

	@Id
	private String id;
	private int id_usuario;
	private String nombreUsuario;
	private String correoElectronico;
	private String contrasenya;
	private int id_avatar;
	private boolean baneado;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public int getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(int id_usuario) {
		this.id_usuario = id_usuario;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

	public String getCorreoElectronico() {
		return correoElectronico;
	}

	public void setCorreoElectronico(String correoElectronico) {
		this.correoElectronico = correoElectronico;
	}

	public String getContrasenya() {
		return contrasenya;
	}

	public void setContrasenya(String contrasenya) {
		this.contrasenya = contrasenya;
	}

	public int getId_avatar() {
		return id_avatar;
	}

	public void setId_avatar(int id_avatar) {
		this.id_avatar = id_avatar;
	}

	public boolean getBaneado() {
		return baneado;
	}

	public void setBaneado(boolean baneado) {
		this.baneado = baneado;
	}
}
