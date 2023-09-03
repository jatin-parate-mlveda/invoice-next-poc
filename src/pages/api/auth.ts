// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const searchParams = new URL("https://localhost" + req.url!).searchParams;
  const shopName = req.query["shop"] as string;

  const apiRes = await fetch(
    `${process.env.API_ENDPOINT}api/shop/app-exists?shop=${shopName}`,
  );
  const {
    isInstalled,
    isOldIhUser,
    // stepReached,
    isSetupCompleted,
  } = await apiRes.json();

  if (!isInstalled) {
    if (!isOldIhUser) {
      res.redirect(
        `${process.env.API_ENDPOINT}shopify?${searchParams.toString()}`,
      );
      return;
    }
  }

  if (
    !isOldIhUser &&
    !req.url!.startsWith("/admin-links") &&
    !isSetupCompleted
  ) {
    res.redirect(`/welcome?${searchParams.toString()}`);
    return;
  } else {
    res.redirect(`/?${searchParams.toString()}`);
  }
}
