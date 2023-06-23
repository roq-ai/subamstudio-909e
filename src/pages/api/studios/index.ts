import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { studioValidationSchema } from 'validationSchema/studios';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStudios();
    case 'POST':
      return createStudio();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudios() {
    const data = await prisma.studio
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'studio'));
    return res.status(200).json(data);
  }

  async function createStudio() {
    await studioValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.Renamedpackage?.length > 0) {
      const create_Renamedpackage = body.Renamedpackage;
      body.Renamedpackage = {
        create: create_Renamedpackage,
      };
    } else {
      delete body.Renamedpackage;
    }
    if (body?.project?.length > 0) {
      const create_project = body.project;
      body.project = {
        create: create_project,
      };
    } else {
      delete body.project;
    }
    const data = await prisma.studio.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
