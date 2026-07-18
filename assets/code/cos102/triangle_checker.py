import math
import matplotlib.pyplot as plt

# This program checks if a triangle is right-angled using two of its angles.
# On top of the True/False check, it also draws the triangle to scale,
# so you get a visual representation of the triangle based on the angles
# entered, and can visually confirm whether it really is a right-angled
# triangle or not.

angle1 = float(input("Enter the first angle of the triangle: "))
angle2 = float(input("Enter the second angle of the triangle: "))

# all angles in a triangle add up to 180
angle3 = 180 - (angle1 + angle2)

# check if angles are valid first
if angle1 <= 0 or angle2 <= 0 or angle3 <= 0:
    print("Invalid input: These angles do not form a valid triangle.")
else:
    print(f"The three angles of the triangle are: {angle1}, {angle2}, {angle3}")

    # now check if one of the angles is 90, and keep the result in a
    # variable so I can reuse it later for the drawing (title/label)
    is_right_angled = angle1 == 90 or angle2 == 90 or angle3 == 90

    if is_right_angled:
        print("The triangle IS a right-angled triangle.")
        triangle_type = "Right-Angled Triangle"
    else:
        print("The triangle is NOT a right-angled triangle.")
        # if it's not right-angled, I check further to say what type
        # of triangle it actually is, just so the drawing is more informative
        if angle1 == angle2 == angle3:
            triangle_type = "Equilateral Triangle (Not Right-Angled)"
        elif angle1 == angle2 or angle2 == angle3 or angle1 == angle3:
            triangle_type = "Isosceles Triangle (Not Right-Angled)"
        else:
            triangle_type = "Scalene Triangle (Not Right-Angled)"

    # ---- draw the triangle to scale ----
    # I place two corners (A and B) along a straight line of a fixed
    # length, then use the two known angles to work out where the
    # third corner (C) must be, using basic trigonometry.

    base_length = 10  # length of side AB (I picked an arbitrary unit length)

    A = (0, 0)
    B = (base_length, 0)

    a1 = math.radians(angle1)
    a2 = math.radians(angle2)

    # the point where the two rays from A and B meet gives corner C
    x = (base_length * math.tan(a2)) / (math.tan(a1) + math.tan(a2))
    y = x * math.tan(a1)
    C = (x, y)

    # work out the actual side lengths using the law of sines
    a3 = math.radians(angle3)
    AC = base_length * math.sin(a2) / math.sin(a3)
    BC = base_length * math.sin(a1) / math.sin(a3)

    print(f"Side AB = {base_length:.2f}, Side AC = {AC:.2f}, Side BC = {BC:.2f}")

    # ---- fit the triangle into a FIXED canvas size, no matter its shape ----
    # depending on the angles, some triangles come out tall and skinny
    # (very acute angles) and some come out short and wide. Instead of
    # letting the plot resize itself every time, I scale the triangle so
    # its longest side always fits inside a fixed CANVAS_SIZE box. This
    # keeps the drawing area (and label spacing) consistent every time.
    CANVAS_SIZE = 10

    xs = [A[0], B[0], C[0]]
    ys = [A[1], B[1], C[1]]
    width = max(xs) - min(xs)
    height = max(ys) - min(ys)
    scale = CANVAS_SIZE / max(width, height)

    def fit_to_canvas(point):
        return ((point[0] - min(xs)) * scale, (point[1] - min(ys)) * scale)

    A, B, C = fit_to_canvas(A), fit_to_canvas(B), fit_to_canvas(C)

    triangle_x = [A[0], B[0], C[0], A[0]]
    triangle_y = [A[1], B[1], C[1], A[1]]

    plt.figure(figsize=(6, 6))
    plt.plot(triangle_x, triangle_y, 'b-', linewidth=2)
    plt.fill(triangle_x, triangle_y, alpha=0.15, color='blue')

    # label each corner with its angle value
    # (smaller font here so the labels don't crowd or overlap the title)
    plt.text(A[0]-0.4, A[1]-0.5, f"A ({angle1}°)", fontsize=8)
    plt.text(B[0]+0.1, B[1]-0.5, f"B ({angle2}°)", fontsize=8)
    plt.text(C[0], C[1]+0.25, f"C ({angle3}°)", fontsize=8)

    plt.gca().set_aspect('equal')

    # fixed margins around the canvas: extra space below the triangle
    # (so corner A/B labels have room) and a bit of space on the sides
    # and above, so nothing gets cut off or touches the title
    margin_bottom = 2.5
    margin_top = 2
    margin_side = 2
    plt.xlim(-margin_side, CANVAS_SIZE + margin_side)
    plt.ylim(-margin_bottom, CANVAS_SIZE + margin_top)

    # I put the triangle type as part of the chart title, so the
    # drawing itself tells you what kind of triangle it is, not just
    # the printed text in the terminal.
    plt.title(f"Triangle Drawn to Scale\nType: {triangle_type}", fontsize=12, pad=12)
    plt.grid(True, linestyle='--', alpha=0.5)
    plt.show()
