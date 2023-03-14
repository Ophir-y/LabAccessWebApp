SELECT
    people_groups.person_group_name,
    people_groups.person_id,
    people.first_name,
    people.last_name
FROM
people_groups
JOIN People  ON People.person_id = People_Groups.person_id;