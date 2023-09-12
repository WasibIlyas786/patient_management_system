const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getNotes = async (req, res) => {
  try {
    const notes = await prisma.appNote.findMany();

    if (!notes.length)
      return res.json({
        message: "No results found!",
        error: true,
      });

    res.status(200).json({
      message: "Data populated successfully",
      error: false,
      data: {
        notes,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createOrUpdateNote = async (req, res) => {
  const { note, noteId } = req.body;

  try {
    let createdOrUpdated;

    if (noteId?.length > 1) {
      console.log("first");
      createdOrUpdated = await prisma.appNote.update({
        where: {
          id: noteId,
        },
        data: {
          note: note,
        },
      });
    } else {
      console.log("second");
      createdOrUpdated = await prisma.appNote.create({
        data: {
          note,
        },
      });
    }

    res.status(201).json({
      data: createdOrUpdated,
      message: "Note created/updated successfully",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
};
