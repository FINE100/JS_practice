package youCanDoIt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet("/board")
public class BoardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	
	
	
	public BoardServlet() {
        super();
    
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/json; charset = utf-8");

		List<Board> list = new ArrayList<>();

		BoardDAO dao = new BoardDAO();
		list = dao.getBoardList();
		System.out.println(list);
		
		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(list);
		response.getWriter().print(json);
	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		response.setContentType("text/json;charset=utf-8");
		response.setCharacterEncoding("utf-8");

		// 추가, 삭제의 기능을 구현.
		String job = request.getParameter("job");
		

		if (job.equals("insert")) {
			Board bd = new Board();
			BoardDAO board = new BoardDAO();
			bd.setTitle(request.getParameter("title"));
			bd.setContent(request.getParameter("content"));
			bd.setWriter(request.getParameter("writer"));

			if (board.insertBoard(bd)) {
				response.getWriter().print("success");
			} else {
				response.getWriter().print("fail");
			}
		} else if (job.equals("delete")) {
			
			BoardDAO board = new BoardDAO();			
			int bno = Integer.parseInt(request.getParameter("bno"));
			
			if (board.deleteBoard(bno)) {
				response.getWriter().print("success");
			} else {
				response.getWriter().print("fail");
			}

		}

	}

	}


