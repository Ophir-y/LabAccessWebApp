-- To get a doors user list with time.
SELECT 
    People.person_id, 
    Permissions_table.start_time, 
    Permissions_table.end_time 
FROM 
    People People 
    JOIN People_Groups  ON People.person_id = People_Groups.person_id
    JOIN Peoples_Permissions_Doors ON People_Groups.person_group_id = Peoples_Permissions_Doors.person_group_id
    JOIN Door_Groups ON Peoples_Permissions_Doors.door_group_id = Door_Groups.door_group_id 
    JOIN Doors ON Door_Groups.door_id = Doors.door_id
    JOIN Permission_Groups  ON Peoples_Permissions_Doors.permission_group_id = Permission_Groups.permission_group_id
    JOIN Permissions_table  ON Permission_Groups.permission_id = Permissions_table.permission_id
WHERE 
    Doors.door_id = ["mydoorID"] 
    AND Permissions_table.permission_type = 'access' 
    AND Permissions_table.expiry_date >= CURDATE()
    AND Permissions_table.start_time <= CURTIME() 
    AND Permissions_table.end_time >= CURTIME();