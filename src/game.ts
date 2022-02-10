// Import necessary dependencies
import * as utils from '@dcl/ecs-scene-utils'
import { Elevator } from './elevator'

// Create elevator material
const elevatorMaterial = new Material()
elevatorMaterial.albedoColor = new Color3(2, 2, 2)
// Instantiate elevator
const elevator = new Elevator(
    new CylinderShape(),
    new Transform({
        position: new Vector3(8, 0, 8),
        scale: new Vector3(1, 0.2, 1)
    }),
    new utils.TriggerBoxShape(
        new Vector3(2,2,2),
        new Vector3(0, 2, 0)
    )
)
elevator.addComponent(elevatorMaterial)
engine.addEntity(elevator)
