-- People scripts:#############################################################################
-- create person

-- INSERT INTO people()
--     VALUES(
--         123456789, -- door_groups
--         'Ophir', -- first_name
--         'Yoram', -- last_name
--         1, -- admin_system_access
--         '159951' -- admin_password / not neccecery if admin_system_access=0 
--     );
INSERT INTO
  people()
VALUES(
    145654123,
    'Michael',
    'Jordan',
    1,
    '159951'
  ),
  (
    204554753,
    'Lionel',
    'Messi',
    1,
    '123456'
  ),
  (
    305474889,		
    'Deigo',
    'Maradona',
    0,
	''
  );
-- more 
(987654321, 'Jane', 'Smith', 1, 'password123'),
(246801357, 'Bob', 'Johnson', 0, ''),
(135792468, 'Alice', 'Brown', 1, 'secret'),
(864209753, 'Mike', 'Davis', 0, ''),
(975310246, 'Karen', 'Wilson', 1, 'letmein'),
(456789123, 'Tom', 'Lee', 0, ''),
(654321987, 'David', 'Clark', 1, 'password1'),
(741852963, 'Lisa', 'Robinson', 0, ''),
(258147369, 'Mark', 'Allen', 0, ''),
(369258147, 'Amy', 'Garcia', 1, 'admin123'),
(951753846, 'Eric', 'Baker', 0, '');
-- update person


-- delete person
DELETE FROM people where person_id = ...
  
  
  
  -- people_groups scripts:#############################################################################
  -- create people_groups
  -- INSERT INTO people_groups()
  --     VALUES(
  --         321, -- person_group_id
  --         123456789, -- person_id
  --         'lab1a people group', -- person_group_name
  --     );
INSERT INTO
  people_groups()
VALUES(
    321,
    123456789,
    'lab1a people group'
  );
-- update people_groups
  -- delete people_groups
DELETE FROM people_groups where people_group_id = ...  
  
  

  -- doors scripts:#############################################################################
  -- create doors
  -- INSERT INTO doors()
  --     VALUES(
  --         12, -- door_id
  --         'lab1a door', -- door_name
  --         'Ulman', -- building_name
  --         1 -- floor_number
  --     );
INSERT INTO `labaccessdb`.`doors`
(`door_id`,
`door_name`,
`building_name`,
`floor_number`)
VALUES
(123,
'lab1',
'ulman',
1),
(1234,
'lab1',
'ulman',
1),
(321,
'lab1',
'ulman',
1),
(32111,
'lab1',
'ulman',
1),
(221,
'lab1',
'ulman',
1);
 -- sum more

(123456789, 'Door1', 'BuildingA', 1),
(987654321, 'Door2', 'BuildingB', 2),
(246801357, 'Door3', 'BuildingC', 3),
(135792468, 'Door4', 'BuildingD', 4),
(864209753, 'Door5', 'BuildingE', 5),
(975310246, 'Door6', 'BuildingF', 6),
(456789123, 'Door7', 'BuildingG', 7),
(654321987, 'Door9', 'BuildingI', 9),
(741852963, 'Door10', 'BuildingJ', 10),
(258147369, 'Door11', 'BuildingK', 1),
(369258147, 'Door12', 'BuildingL', 2),
(951753846, 'Door13', 'BuildingM', 3),
(123456780, 'Door14', 'BuildingN', 4),
(123456781, 'Door15', 'BuildingO', 5),
(123456782, 'Door16', 'BuildingP', 6),
(123456783, 'Door17', 'BuildingQ', 7),
(123456784, 'Door18', 'BuildingR', 8),
(123456785, 'Door19', 'BuildingS', 9),
(123456786, 'Door20', 'BuildingT', 10),
(123456787, 'Door21', 'BuildingU', 1),
(123456788, 'Door22', 'BuildingV', 2),
(123456790, 'Door24', 'BuildingX', 4),
(123456791, 'Door25', 'BuildingY', 5),
(123456792, 'Door26', 'BuildingZ', 6),
(123456793, 'Door27', 'BuildingA', 7),
(123456794, 'Door28', 'BuildingB', 8),
(123456795, 'Door29', 'BuildingC', 9),
(123456796, 'Door30', 'BuildingD', 10),
(123456797, 'Door31', 'BuildingE', 1),
(123456798, 'Door32', 'BuildingF', 2),
(123456799, 'Door33', 'BuildingG', 3),
(123456800, 'Door34', 'BuildingH', 4),
(123456801, 'Door35', 'BuildingI', 5),
(123456802, 'Door36', 'BuildingJ', 6),
(123456803, 'Door37', 'BuildingK', 7),
(123456804, 'Door38', 'BuildingL', 8),
(123456805, 'Door39', 'BuildingM', 9),
(123456806, 'Door40', 'BuildingN', 10),
(123456807, 'Door41', 'BuildingO', 1);

-- update doors
-- delete doors
DELETE FROM doors where door_id = ...  
  -- door_groups scripts:#############################################################################
  -- create door_groups
  -- INSERT INTO door_groups()
  --     VALUES(
  --         112, -- door_group_id
  --         12, -- door_id
  --         'lab1a door group'-- door_group_name
  --     );
INSERT INTO
  door_groups()
VALUES(112, 12, 'lab1a door group');
-- update door_groups
-- delete door_groups
DELETE FROM door_groups where door_group_id = ...  




  -- permissions scripts:#############################################################################
  -- create permissions
  -- INSERT INTO permissions()
  --     VALUES(
  --         21, -- permissions_id
  --         'Door Access', -- permission_type
  -- --         \'Door Access\' - grants access to a door.
  -- --          \'Admin Privileges\' - grants admin privilages to a door.
  -- --          \'Admin Add People\' - permitts adding people to the system.
  -- --          \'Admin Add Doors\' - permitts adding doors to the system.
  -- --          \'Admin Add Permissions\' - permitts adding permissions to people for specific doors.
  -- --          \'Admin Add Admin\' - grants permit to add another admin to a door.',
  --         '2021-07-26', -- initial_date
  --         '2021-07-29', -- expiry_date
  --         '05:05:05' -- start_time
  --         '15:05:05' -- end_time
  --     );
INSERT INTO
  permissions()
VALUES(
    21,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  ),(
    52,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  ),(
    22,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  ),(
    4,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  ),(
    32,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  ),(
    5,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  ),(
    25,
    'Door Access',
    '2021-07-26',
    '2021-07-29',
    '05:05:05',
    '15:05:05'
  );
  
-- update permissions

-- delete permissions
DELETE FROM permissions where permissions_id = ...  
  
  
  
  -- permission_sets scripts:#############################################################################
  -- create permission_sets
  -- INSERT INTO permission_sets()
  --     VALUES(
  --         221, -- door_group_id
  --         21, -- door_id
  --         'lab1a permissions group' -- door_group_name
  --     );
INSERT INTO
  permission_sets()
VALUES(
    221,
    21,
    'lab1a permissions group'
  );
-- update permission_sets

-- delete permission_sets
DELETE FROM permission_sets where permission_set_id = ...
  
  
  
  
  -- peoples_permissions_doors scripts:#############################################################################
  -- create peoples_permissions_doors
  -- INSERT INTO peoples_permissions_doors()
  --     VALUES(
  --             321--  person_group_id
  --           112 --  door_group_id
  --           221 --  permission_set_id
  --           'lab1a permissions group' --  permission_set_name
  --             'lab1a people group'--  person_group_name
  --             'lab1a door group'--  door_group_name
  --     );
INSERT INTO
  peoples_permissions_doors()
VALUES(
    321,
	112,
    221,
    'lab1a permissions group',
    'lab1a people group',
    'lab1a door group'
  );
-- update peoples_permissions_doors

-- delete peoples_permissions_doors
