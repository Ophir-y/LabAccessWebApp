-- To get a doors user list with time.
SELECT DISTINCT
    People.person_id, 
    permissions.initial_date,
    permissions.expiry_date,
    permissions.start_time, 
    permissions.end_time 
FROM 
    People People 
    JOIN People_Groups  ON People.person_id = People_Groups.person_id
    JOIN Peoples_Permissions_Doors ON People_Groups.person_group_name = Peoples_Permissions_Doors.person_group_name
    JOIN Door_Groups ON Peoples_Permissions_Doors.door_group_name  = Door_Groups.door_group_name 
    JOIN Doors ON Door_Groups.door_id = Doors.door_id
    JOIN permission_sets  ON Peoples_Permissions_Doors.permission_set_name  = permission_sets.permission_set_name 
    JOIN permissions  ON permission_sets.permission_id = permissions.permission_id
WHERE 
    Doors.door_id = '123' 
    AND permissions.permission_type = 'Door Access';


-- SELECT DISTINCT
--     People.person_id, 
--     initial_date,
--     expiry_date,
--     permissions.start_time, 
--     permissions.end_time 
-- FROM 
--     People People 
--     JOIN People_Groups  ON People.person_id = People_Groups.person_id
--     JOIN Peoples_Permissions_Doors ON People_Groups.person_group_name = Peoples_Permissions_Doors.person_group_name
--     JOIN Door_Groups ON Peoples_Permissions_Doors.door_group_name  = Door_Groups.door_group_name 
--     JOIN Doors ON Door_Groups.door_id = Doors.door_id
--     JOIN permission_sets  ON Peoples_Permissions_Doors.permission_set_name  = permission_sets.permission_set_name 
--     JOIN permissions  ON permission_sets.permission_id = permissions.permission_id
-- WHERE 
--     Doors.door_id = '123' 
--     AND permissions.permission_type = 'Door Access' 
--     AND permissions.expiry_date >= CURDATE()
--     AND permissions.start_time <= CURTIME() 
--     AND permissions.end_time >= CURTIME();