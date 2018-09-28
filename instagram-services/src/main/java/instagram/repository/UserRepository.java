package instagram.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import instagram.model.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	@Query("SELECT u FROM User u WHERE u.username = ?1")
	User findOneByUsernameIfIsValid(String username);

	User findOneByUsername(String username);
}