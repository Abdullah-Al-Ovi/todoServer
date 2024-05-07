import prisma from "../db/db.config.js"

class UserController {

    static async store(req, res) {
        const { name, email, password } = req.body;
        // console.log(name, email, password);
        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            console.log(newUser);
            if (!newUser) {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    message: "Failed to register"
                });
            }
            return res.status(201).json({
                success: true,
                status: 201,
                message: "User created successfully",
                data: newUser
            });
        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(400).json({
                    success: false,
                    status: 400,
                    message: "User with this email already exists"
                });
            } else {
                return res.status(500).json({
                    success: false,
                    status: 500,
                    message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while doing registration"
                });
            }
        }
    }
    

    static async index(req, res) {
        try {

        } catch (error) {

        }
    }

    static async show(req, res) {

        try {

        } catch (error) {

        }
    }

    static async update(req, res) {
        try {

        } catch (error) {

        }
    }

    static async destroy(req, res) {
        try {

        } catch (error) {

        }
    }

    static async login(req, res) {
        const { email, password } = req.body
        console.log(email, password);
        try {
            if (!email) {
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "Email is required"
                })
            }
            if (!password) {
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "Password is required"
                })
            }
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            console.log(user);
            if (!user) {
                return res.status(403).json({
                    success: false,
                    status: 403,
                    message: "No user is found"
                })
            }
            if (user.password === password) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Login successful",
                    data: user
                })
            }
            else {
                return res.status(401).json({
                    success: false,
                    status: 401,
                    message: "Invalid user credentials"
                })
            }
        } catch (error) {
            // console.log(error);
            return res.status(error?.code || 500).json({
                success: false,
                status: error?.code || 500,
                message: error.message || error.meta?.message || error.meta?.cause || "Something went wrong while logging in",
            })
        }

    }




}

export default UserController