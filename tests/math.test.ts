function sum(a: number, b: number): number {
    return a + b;
  }
  
  test("Suma de 2 + 3 debe ser 5", () => {
    expect(sum(2, 3)).toBe(5);
  });