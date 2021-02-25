const express = require('express');
const router = express.Router();


const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];


router.get ('/',(req, res) => {
    res.send(courses);
  });

router.post('/', (req, res) => {

    const {error} = validateCourse(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message);
    
    

    const course ={
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the course not found')

  
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
       
    course.name = req.body.name;
    res.send(course);

});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the course not found')

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});


router.get ('/:id',(req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('the course not found')
    res.send(course);
  });

module.exports = router;