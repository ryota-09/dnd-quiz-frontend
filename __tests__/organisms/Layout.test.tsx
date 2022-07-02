/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester"
import { setupServer } from "msw/node"

import { handler } from "../../mock/handler"

initTestHelpers();

const server = setupServer(...handler);

beforeAll(() => {
  server.listen();
})
afterEach(() => {
  server.resetHandlers();
  cleanup();
})
afterAll(() => {
  server.close();
})

describe("organisms/Layout.tsx", () => {
  test("正常系: ナビゲーションバーが正常に機能し、それぞれ正しく遷移する。", async () => {
    const { page } = await getPage({
      route: "/index",
    });
    render(page);
    expect(await screen.findByText("ランキング")).toBeInTheDocument();
  });
});
