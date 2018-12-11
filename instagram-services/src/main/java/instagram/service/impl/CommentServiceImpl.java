package instagram.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.google.common.collect.Lists;

import instagram.exception.BusinessException;
import instagram.exception.ErrorCodes;
import instagram.model.Comment;
import instagram.repository.CommentRepository;
import instagram.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;

	public void setCommentRepository(CommentRepository cr) {
		commentRepository = cr;
	}

	@Override
	public Comment getCommentById(int id) throws BusinessException {
		return commentRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCodes.COMMENT_NOT_FOUND));
	}

	@Override
	public Comment addComment(int idUser, int idPost, String content) throws BusinessException {
		Comment comment = new Comment();
		
		comment.setIdUser(idUser);
		comment.setIdPost(idPost);
		comment.setContent(content);
		comment.setCreatedAt(new Date());
		comment.setUpdatedAt(null);
		
		commentRepository.save(comment);
		
		return comment;
	}

	@Override
	public Comment editComment(int id, String newContent) throws BusinessException {
		Comment comment = commentRepository.findById(id).orElseThrow(() -> new BusinessException(ErrorCodes.COMMENT_NOT_FOUND));
		
		comment.setContent(newContent);
		comment.setUpdatedAt(new Date());
		
		commentRepository.save(comment);
		
		return comment;
	}

	@Override
	public void deleteComment(int id) throws BusinessException {
		if (commentRepository.existsById(id)) {
			commentRepository.deleteById(id);
		} else {
			throw new BusinessException(ErrorCodes.COMMENT_NOT_FOUND);
		}
	}

	@Override
	public List<Comment> getCommentsByUser(int idUser) {
		return commentRepository.findAllByIdUser(idUser);
	}

	@Override
	public List<Comment> getCommentsByPost(int idPost) {
		return commentRepository.findAllByIdPost(idPost);
	}

}
