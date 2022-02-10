// Import required dependencies
import * as utils from "@dcl/ecs-scene-utils";

// Instantiate first, second, and third floor vectors
let firstFloor = new Vector3(8, 0, 8)
let secondFloor = new Vector3(8, 2, 8)
let thirdFloor = new Vector3(8, 4, 8)
// Instantiate elevator location information
let UP = true
let start:Vector3 = firstFloor
let end:Vector3 = secondFloor

// Create new class Elevator from Entity
export class Elevator extends Entity {
    constructor(
        model: BoxShape,
        transform: Transform,
        triggerShape: utils.TriggerBoxShape
    ) {
        super()
        engine.addEntity(this)
        this.addComponent(model)
        this.addComponent(transform)

        // Create trigger for elevator class
        this.addComponent(
            new utils.TriggerComponent(triggerShape, {
                onCameraEnter: () => {
                    this.getComponent(utils.ToggleComponent).toggle()
                },
                onCameraExit: () => {
                    this.getComponent(utils.ToggleComponent).toggle()
                },
            })
        )

        // Create toggle initiated by trigger
        this.addComponent(
            new utils.ToggleComponent(utils.ToggleState.Off, (value) => {
                    if (value == utils.ToggleState.On) {
                        start = this.getComponent(Transform).position
                        if (start.equals(firstFloor)) {
                            end = secondFloor
                            UP = true
                        } else if (start.equals(secondFloor)) {
                            end = UP ? thirdFloor : firstFloor
                        } else if (start.equals(thirdFloor)) {
                            end = secondFloor
                            UP = false
                        }
                        this.addComponentOrReplace(
                            new utils.MoveTransformComponent(start, end, 1.5)
                        )}
                }
            )
        )
    }
}