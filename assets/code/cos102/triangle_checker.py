# this program checks if a triangle is right angled
# using 2 of its angles

angle1 = float(input("Enter the first angle of the triangle: "))
angle2 = float(input("Enter the second angle of the triangle: "))

# All the angles in a triangle add up to 180 degrees,
# so I use that fact to find the third angle.
angle3 = 180 - (angle1 + angle2)

# Before checking anything, I make sure the angles the user typed
# actually make sense (they can't be zero or negative).
if angle1 <= 0 or angle2 <= 0 or angle3 <= 0:
    print("Invalid input: These angles do not form a valid triangle.")
else:
    print(f"The three angles of the triangle are: {angle1}, {angle2}, {angle3}")

    # Now I check if any one of the 3 angles is exactly 90 degrees.
    # If it is, then the triangle is right-angled.
    if angle1 == 90 or angle2 == 90 or angle3 == 90:
        print("The triangle IS a right-angled triangle.")
    else:
        print("The triangle is NOT a right-angled triangle.")
