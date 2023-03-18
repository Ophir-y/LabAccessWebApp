-- To get a doors user list with time.
SELECT 
    People.person_id, 
    permissions.start_time, 
    permissions.end_time 
FROM 
    People People 
    JOIN People_Groups  ON People.person_id = People_Groups.person_id
    JOIN Peoples_Permissions_Doors ON People_Groups.person_group_name = Peoples_Permissions_Doors.person_group_name
    JOIN Door_Groups ON Peoples_Permissions_Doors.door_group_id = Door_Groups.door_group_id 
    JOIN Doors ON Door_Groups.door_id = Doors.door_id
    JOIN Permission_Groups  ON Peoples_Permissions_Doors.permission_group_id = Permission_Groups.permission_group_id
    JOIN permissions  ON Permission_Groups.permission_id = permissions.permission_id
WHERE 
    Doors.door_id = ["mydoorID"] 
    AND permissions.permission_type = 'access' 
    AND permissions.expiry_date >= CURDATE()
    AND permissions.start_time <= CURTIME() 
    AND permissions.end_time >= CURTIME();