

module.exports = {

    boardList : `select * from t_board_board`,

    boardInfo : `select * from t_board_board where no=?`,

    boardInsert : `insert into t_board_board set ? ` ,

    boardUpdate : `update t_board_board set? where no=?` ,

    //boardDelete : `delete from t_board_board where no=?`,

    replyList : `select * from t_comment_board`
    
}