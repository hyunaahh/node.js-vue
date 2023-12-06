let empDept = {
    insert :
    `INSERT INTO dept_emp SET emp_no=?, dept_no=?, from_date=?, to_date=CAST('9999-01-01' As Date)`,
    update: 
    `update dept_emp set to_date=? where emp_no=?`,
}

let salaries = {
    insert : `INSERT INTO salaries set ?`,
    
}


let dept = {
    list: `select dept_no, dept_name from departments order by dept_no`,
  };




let emp = {
    empList : 
    `select e.emp_no,
            e.first_name,
            e.last_name,
            e.gender,
            e.hire_date,
            s.salary,
            d.dept_no,
            d.dept_name
    from employees e Join dept_emp h
                    on (e.emp_no = h.emp_no)
                    join departments d
                    on(h.dept_no = d.dept_no)
                    join salaries s
                    on(e.emp_no = s.emp_no)
    where h.to_date = CAST('9999-01-01' AS DATE)
    AND s.to_date = CAST('9999-01-01' AS DATE)
    order by e.emp_no DESC
    limit 0,10`,
    


empInfo : `select e.emp_no,
        e.first_name,
        e.last_name,
        e.gender,
        e.hire_date,
        s.salary,
        d.dept_no,
        d.dept_name
    from employees e Join dept_emp h
                on (e.emp_no = h.emp_no)
                join departments d
                on(h.dept_no = d.dept_no)
                join salaries s
                on(e.emp_no = s.emp_no)
    where h.to_date = CAST('9999-01-01' AS DATE)
    AND s.to_date = CAST('9999-01-01' AS DATE)
    AND e.emp_no = ?`,


empInsert : `insert into employees set ?`,


empUpdate : `update employees set ? where emp_no=?`

}




module.exports = {

   empDept,
   salaries,
   emp,
   dept
    
}