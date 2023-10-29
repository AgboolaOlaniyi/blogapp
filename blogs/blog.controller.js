const blogModel = require("../models/blog")


const createBlog = async ({ title, description, author, state, drafted_time, body, read_count, reading_time, tag, user_id }) => {
    const blogInfo = { title, description, author, state, drafted_time, body, read_count, reading_time, tag, user_id };
    if (!blogInfo) {
        return {
            message: "invalid info",
            code: 422,
        }
    }
    const blog = await blogModel.create(blogInfo);
    return {
        message: "Task successfully created",
        code: 200,
        blog,
    };
}

const getAllBlog = (req, res) =>
    blogModel.find()
        .then(blogs => {
            res.send(blogs)
        }).catch((err) => {
            console.log(err)
            res.send(err.message)
        })


const updateBlog = async (req, res) => {
    const id = req.params.id
    const update = req.body
    const blog = await blogModel.findByIdAndUpdate(id, update, { new: true })
        .then((blog) => {
            res.status(200).send(blog)
        }).catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
}
const getSpecificBlog = async (req, res) => {
    const id = req.params.id
    const blog = await blogModel.findBy(id)
        .then(blog => {
            res.send(blog)
        }).catch((err) => {
            console.log(err)
            res.send(err.message)
        })
};

const deleteBlog = async (req, res) => {
    const id = req.params.id
    const blog = await blogModel.findByIdAndRemove(id)
        .then(blog => {
            res.send(blog)
        }).catch((err) => {
            console.log(err)
            res.send(err.message)
        })
}
const updateState = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    try {
        const blog = await blogModel.findById(id)
        if (!blog) {
            console.log("blog not found")
            return res.status(404).send({ error: 'blog not found' })
        }

        console.log(`User: ${user}`)
        console.log(`Author: ${blog.author}`)

        if (user.toString() !== blog.author.toString()) {
            console.log('You are not the author')
            return res.status(404).json({ status: false, blog: null })
        }

        if (blog.state === "published") {
            return res.status(400).send({ error: 'blog already published' })
        }

        switch (state) {
            case 'published':
                blog.state = state;
                await blog.save();
                return res.json({ status: true, blog })

            case 'draft':
                return res.status(400).json("not allowed")
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

const getBlogbyAuthorTagTittle = async (req, res) => {
    const { query } = req;
    const {
        title,
        tags,
        author,
        state,
        page = 1,
        per_page = 20
    } = query

    const findQuery = {};


    try {

        if (state === 'draft') {
            return res.status(400).send({ error: 'You cannot read book in draft state' })
        }
        findQuery.state = state
        if (title) {
            findQuery.title = title;
        }
        else if (tags) {
            findQuery.tags = tags;
        }
        else if (author) {
            findQuery.author = author;
        }


        const blog = await blogModel
            .find(findQuery)
            .skip(page)
            .limit(per_page)

        return res.json({ status: true, blog })


    } catch (err) {
        return res.json(err);
    }
}
const getBlogById = async (req, res) => {

    const blogId = req.params.id;
    try{
        const blog = await blogModel.findById(blogId)

    if (blog.state !== 'published') {
        return res.status(404).json({ status: false, blog: null })
    }

    blog.read_count += 1;
    await blog.save()

    return res.json({ status: true, blog })

    } catch(err){
        return res.json(err);
    }   
}

module.exports = {
    getAllBlog,
    createBlog,
    deleteBlog,
    updateBlog,
    getSpecificBlog,
    updateState,
    getBlogbyAuthorTagTittle,
    getBlogById
}