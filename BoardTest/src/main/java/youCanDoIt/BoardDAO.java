package youCanDoIt;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BoardDAO extends DAO {
	
	List<Board>list = new ArrayList<>();
	Board bd = new Board();
	int result = 0 ;
	
	// 조회
	public List<Board> getBoardList() {
		String sql = "select * from tbl_board";
		conn();
		try {
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				bd.setBno(rs.getInt("bno"));
				bd.setTitle(rs.getString("title"));
				bd.setContent(rs.getString("content"));
				bd.setWriter(rs.getString("writer"));
				bd.setCreationDate(rs.getString("creation_date"));
				list.add(bd);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			disconnect();
		}
		return list;
	}

	// 삭제
	public boolean deleteBoard(int bno) {
		String sql = "delete from tbl_board where bno = ?";
				conn();
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, bno);
			result = pstmt.executeUpdate();
			
			if(result >0) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
	}

	// 데이터 입력
	public boolean insertBoard(Board board) {
		String sql = "insert into tbl_board (bno, title, content, writer, creation_date)"
				+ " values ((select max(bno)+1 from tbl_board), ?, ?, ?, to_char(sysdate,'yyyy/mm/dd'))";
		
		conn();

		try {
			pstmt = conn.prepareStatement(sql);	
			pstmt.setString(1,bd.getTitle());
			pstmt.setString(2, bd.getContent());
			pstmt.setString(3, bd.getWriter());
			
			result = pstmt.executeUpdate();
			
			if(result>0) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			disconnect();
		}
		return false;
	}
}
