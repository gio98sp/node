const { Op } = require("sequelize");

const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = class ThoughtsController {
  static async showThoughts(req, res) {
    let search = req.query.search || "";

    let order = req.query.order === "old" ? "ASC" : "DESC";

    const thoughtsData = await Thought.findAll({
      include: User,
      where: { title: { [Op.like]: `%${search}%` } },
      order: [["createdAt", order]],
    });

    const thoughts = thoughtsData.map((result) => result.get({ plain: true }));

    let thoughtsQty = thoughts.length === 0 ? false : thoughts.length;

    res.render("thoughts/home", { thoughts, search, thoughtsQty });
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: { id: userId },
      include: Thought,
      plain: true,
    });

    if (!user) {
      res.redirect("/login");
    }

    const thoughts = user.Thoughts.map((result) => result.dataValues);

    let emptyThoughts = thoughts.length === 0 ? true : false;

    res.render("thoughts/dashboard", { thoughts, emptyThoughts });
  }

  static createThought(req, res) {
    res.render("thoughts/create");
  }

  static async createThoughtSave(req, res) {
    const thought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Thought.create(thought);

      req.flash("message", "Pensamento creiado com sucesso!");

      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (err) {
      console.error(err);
    }
  }

  static async removeThought(req, res) {
    const idThought = req.body.id;
    const userId = req.session.userid;

    try {
      await Thought.destroy({ where: { id: idThought, UserId: userId } });

      req.flash("message", "Pensamento removido com sucesso!");

      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
    } catch (err) {
      console.error(err);
    }
  }

  static async editThought(req, res) {
    const thoughtId = req.params.id;
    const userId = req.session.userid;

    const thought = await Thought.findOne({
      where: { id: thoughtId, UserId: userId },
      raw: true,
    });

    console.log(thought);

    res.render("thoughts/edit", { thought });
  }

  static async updateThought(req, res) {
    const idThought = req.body.id;

    const thought = {
      title: req.body.title,
    };

    try {
      await Thought.update(thought, { where: { id: idThought } });

      req.flash("message", "Pensamento atualizado com sucesso!");

      req.session.save(() => {
        res.redirect("dashboard");
      });
    } catch (err) {
      console.error(err);
    }
  }
};
